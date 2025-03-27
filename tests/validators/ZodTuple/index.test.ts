import { describe } from "node:test";
import { z } from "zod";
import { zodTupleValidationGenerator } from "../../../src/validators/ZodTuple";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodTupleValidationGenerator);

describe('ZodTuple', () => {
    addTestCase('base case', {
        zodSchema: z.tuple([
            z.string(),
            z.number()
        ]),
        validInputs: [
            ['some string', 123],
        ],
        invalidInputs: [
            [],
            ['some string'],
            [123],
            [123, 'some string']
        ],
        expectedValidatorSchema: {
            bsonType: 'array',
            items: [
                {
                    bsonType: 'string'
                },
                {
                    bsonType: 'number'
                }
            ],
            minItems: 2,
            maxItems: 2
        }
    })
});