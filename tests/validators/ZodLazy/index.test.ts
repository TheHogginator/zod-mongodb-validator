import { describe } from "node:test";
import { z } from "zod";
import { zodLazyValidationGenerator } from "../../../src/validators/ZodLazy";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodLazyValidationGenerator);

// TODO Test recursive types
describe('ZodLazy', () => {
    addTestCase('base case', {
        zodSchema: z.lazy(() => z.string()),
        validInputs: ['abc', '123'],
        invalidInputs: [
            123,
            true
        ],
        expectedValidatorSchema: {
            bsonType: 'string'
        }
    })
})