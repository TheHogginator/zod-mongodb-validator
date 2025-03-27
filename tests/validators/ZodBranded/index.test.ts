import { z } from "zod"
import { describe, } from "node:test"
import { zodBrandedValidationGenerator } from "../../../src/validators/ZodBranded";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodBrandedValidationGenerator);

describe('ZodBranded', () => {
    addTestCase('base case', {
        zodSchema: z.string().brand('BRAND'),
        validInputs: [
            'abc',
            'def'
        ],
        invalidInputs: [
            1,
            true,
        ],
        expectedValidatorSchema: {
            bsonType: 'string'
        }
    })
});