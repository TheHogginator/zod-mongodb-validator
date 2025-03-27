import { describe } from "node:test";
import { z } from "zod";
import { zodRecordValidationGenerator } from "../../../src/validators/ZodRecord";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodRecordValidationGenerator);

describe('ZodRecord', () => {
    addTestCase('base case', {
        zodSchema: z.record(z.string(), z.string()),
        validInputs: [
            {test: 'ok'},
            {other: 'still ok'},
            {}
        ],
        invalidInputs: [
            {test: 123},
            {other: true}
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            additionalProperties: {
                bsonType: 'string'
            }
        }
    })
})