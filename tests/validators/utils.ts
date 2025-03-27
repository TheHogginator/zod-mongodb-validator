import {type ZodType} from 'zod'
import { after, before, describe, it } from 'node:test'
import { MongoClient, MongoServerError } from 'mongodb'
import assert from 'node:assert'
import type { GeneratorUtils, ValidationGenerator } from '../../src/types/Generator'
import { GenerationError } from '../../src/GenerationError'
import { zodToMongoDBValidator } from '../../src/index';

type TestCase<T extends ZodType> = {
    zodSchema: T,
    validInputs: Array<any>,
    invalidInputs: Array<any>
    expectedValidatorSchema: {[key: string]: any}
}

export const MockUtils: GeneratorUtils = {
    GenerationError: class extends GenerationError {
        constructor(message: string) {
            super(message, ['$']);
        }
    },
    getSubSchema: (type, pathEntry) => {
        return {$jsonSchema: {title: `Test_SubSchema: ${pathEntry}`}}
    },
    options: {}
}

export const testCaseFactory = <T extends ZodType>(parser: ValidationGenerator<T>) => (description: string, testCase: TestCase<T>) => {
    describe(description, async (context) => {
        const validatorSchema = zodToMongoDBValidator(testCase.zodSchema);
        
        const collectionName = (context as unknown as any).fullName || context.name;

        const client = new MongoClient('mongodb://db:27017/');
        const db = client.db('TEST');
        await db.dropCollection(collectionName);
        await db.createCollection(collectionName, {
            validator: {
                $jsonSchema: {
                    "bsonType": "object",
                    "required": ["test", "value"],
                    "properties": {
                        "value": validatorSchema.$jsonSchema,
                        "test": {
                            "type": "string"
                        }
                    }
                }
            }
        });
        const collection = db.collection(collectionName);

        it('should match the expected schema', () => {
            assert.deepStrictEqual(validatorSchema.$jsonSchema, testCase.expectedValidatorSchema);
        });

        for (const validInput of testCase.validInputs) {
            it(`should accept ${JSON.stringify(validInput)}`, async (context) => {
                try {
                    await collection.insertOne({ test: context.name, value: validInput });
                } catch(error) {
                    if(error instanceof MongoServerError && error.errInfo) {
                        console.error(JSON.stringify(error.errInfo.details, null, 4))
                    }
                    throw error;
                }
            })
        }

        for await (const invalidInput of testCase.invalidInputs) {
            it(`should not accept ${JSON.stringify(invalidInput)}`, async (context) => {
                await assert.rejects(async () => {
                    await collection.insertOne({ test: context.name, value: invalidInput })
                })
            })
        }

        before(async () => {
            await client.connect();
        })

        after(async () => {
            await client.close();
        })
    })
}
