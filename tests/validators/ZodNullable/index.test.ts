import { describe } from "node:test";
import { z } from "zod";
import { zodNullableValidationGenerator } from "../../../src/validators/ZodNullable";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodNullableValidationGenerator);

describe('ZodNullable', () => {
    addTestCase('base case', {
        zodSchema: z.string().nullable(),
        validInputs: [
            null,
            'test',
            /**
             * MongoDB by default will convert undefiend to null
             * @see https://www.mongodb.com/docs/drivers/node/current/fundamentals/bson/undefined-values/ 
             */
            undefined
        ],
        invalidInputs: [
            0,
        ],
        expectedValidatorSchema: {
            oneOf: [
                { bsonType: 'string' },
                { bsonType: 'null' }
            ]
        }
    })
});