import { describe } from "node:test";
import { z } from "zod";
import { zodDiscriminatedUnionValidationGenerator } from "../../../src/validators/ZodDiscriminatedUnion";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodDiscriminatedUnionValidationGenerator);

describe('ZodDiscriminatedUnion', () => {
    addTestCase('base case', {
        zodSchema: z.discriminatedUnion('kind', [
            z.object({kind: z.literal('A'), value: z.string()}),
            z.object({kind: z.literal('B'), value: z.number()}),
        ]),
        validInputs: [
            {kind: 'A', value: 'some string'},
            {kind: 'B', value: 123}
        ],
        invalidInputs: [
            {kind: 'B', value: 'some string'},
            {kind: 'A', value: 123}
        ],
        expectedValidatorSchema: {
            anyOf: [
                {
                    bsonType: 'object',
                    required: ['kind', 'value'],
                    properties: {
                        kind: {
                            enum: ['A'],
                        },
                        value: {
                            bsonType: 'string'
                        }
                    },
                    additionalProperties: false
                },
                {
                    bsonType: 'object',
                    required: ['kind', 'value'],
                    properties: {
                        kind: {
                            enum: ['B'],
                        },
                        value: {
                            bsonType: 'number'
                        }
                    },
                    additionalProperties: false
                }
            ]
        }
    })
});