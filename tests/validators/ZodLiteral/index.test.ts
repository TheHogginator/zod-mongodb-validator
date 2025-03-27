import { describe } from "node:test";
import { z } from "zod";
import { zodLiteralValidationGenerator } from "../../../src/validators/ZodLiteral";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodLiteralValidationGenerator);

describe('ZodLiteral', () => {
    addTestCase('base case', {
        zodSchema: z.literal('test'),
        validInputs: [
            'test'
        ],
        invalidInputs: [
            'not test'
        ],
        expectedValidatorSchema: {
            enum: ['test']
        }
    });
});