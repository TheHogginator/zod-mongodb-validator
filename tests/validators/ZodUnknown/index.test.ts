import { describe } from "node:test";
import { z } from "zod";
import { zodUnknownValidationGenerator } from "../../../src/validators/ZodUnknown";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodUnknownValidationGenerator);

describe('ZodUnknown', () => {
    addTestCase('base case', {
        zodSchema: z.unknown(),
        validInputs: [
            1,
            'a',
            true,
            ['blah'],
            {a: 'value'}
        ],
        invalidInputs: [],
        expectedValidatorSchema: {}
    })
})