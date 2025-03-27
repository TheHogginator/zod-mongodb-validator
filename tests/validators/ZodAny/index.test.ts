import { describe } from "node:test";
import { z } from "zod";
import { zodAnyValidationGenerator } from "../../../src/validators/ZodAny";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodAnyValidationGenerator);

describe('ZodAny', () => {
    addTestCase('base case', {
        zodSchema: z.any(),
        validInputs: [
            1,
            'a',
            true,
            ['blah'],
            {a: 'value'}
        ],
        invalidInputs: [],
        expectedValidatorSchema: {}
    });
})