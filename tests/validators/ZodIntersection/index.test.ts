import { describe } from "node:test";
import { z } from "zod";
import { zodIntersectionValidationGenerator } from "../../../src/validators/ZodIntersection";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodIntersectionValidationGenerator);

describe('ZodIntersection', () => {
    addTestCase('base case', {
        zodSchema: z.intersection(
            z.object({A: z.string()}).passthrough(),
            z.object({B: z.string()}).passthrough()
        ),
        validInputs: [
            {A: 'a', B: 'b'}
        ],
        invalidInputs: [
            {A: 'a'},
            {B: 'b'},
            {},
            'sdiof'
        ],
        expectedValidatorSchema: {
            allOf: [
                {
                    bsonType: 'object',
                    required: ['A'],
                    properties: {
                        A: {
                            bsonType: 'string'
                        }
                    },
                    additionalProperties: true
                },
                {
                    bsonType: 'object',
                    required: ['B'],
                    properties: {
                        B: {
                            bsonType: 'string'
                        }
                    },
                    additionalProperties: true
                },
            ]
        }
    });
});