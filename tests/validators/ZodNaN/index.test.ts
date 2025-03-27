import { describe } from "node:test";
import { z } from "zod";
import { zodNaNValidationGenerator } from "../../../src/validators/ZodNaN";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodNaNValidationGenerator);

describe('ZodNaN', () => {
    addTestCase('base case', {
        zodSchema: z.nan(),
        validInputs: [NaN],
        invalidInputs: [123],
        expectedValidatorSchema: {
            enum: [NaN]
        }
    })
})