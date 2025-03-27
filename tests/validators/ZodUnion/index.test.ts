import { describe } from "node:test";
import { z } from "zod";
import { zodUnionValidationGenerator } from "../../../src/validators/ZodUnion";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodUnionValidationGenerator);

describe('ZodUnion', () => {
    addTestCase('base case', {
        zodSchema: z.union([
            z.string(),
            z.number()
        ]),
        validInputs: [
            'some string',
            123
        ],
        invalidInputs: [
            true,
            []
        ],
        expectedValidatorSchema: {
            anyOf: [
                {
                    bsonType: 'string'
                },
                {
                    bsonType: 'number'
                }
            ]
        }
    })
});