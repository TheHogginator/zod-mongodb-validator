import { describe } from "node:test";
import { z } from "zod";
import { zodEnumValidationGenerator } from "../../../src/validators/ZodEnum";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodEnumValidationGenerator);

describe('ZodEnum', () => {
    addTestCase('base case', {
        zodSchema: z.enum(['a', 'b', 'c']),
        validInputs: [
            'a',
            'b',
            'c'
        ],
        invalidInputs: [
            'd',
            ['a', 'b']
        ],
        expectedValidatorSchema: {
            enum: ['a', 'b', 'c']
        }
    });
});