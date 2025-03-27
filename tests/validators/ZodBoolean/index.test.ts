import { describe } from "node:test";
import { z } from "zod";
import { zodBooleanValidationGenerator } from "../../../src/validators/ZodBoolean";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodBooleanValidationGenerator);

describe('ZodBoolean', () => {
    addTestCase('base case', {
        zodSchema: z.boolean(),
        validInputs: [
            true,
            false
        ],
        invalidInputs: [
            'true',
            1
        ],
        expectedValidatorSchema: {
            bsonType: 'bool'
        }
    })
});