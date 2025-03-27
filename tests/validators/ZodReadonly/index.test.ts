import { describe } from "node:test";
import { z } from "zod";
import { zodReadonlyValidationGenerator } from "../../../src/validators/ZodReadonly";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodReadonlyValidationGenerator);

describe('ZodReadonly', () => {
    addTestCase('base case', {
        zodSchema: z.string().readonly(),
        validInputs: [
            '123'
        ],
        invalidInputs: [
            123
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
        }
    })
});