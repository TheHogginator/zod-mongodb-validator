import { describe } from "node:test";
import { z } from "zod";
import { zodObjectValidationGenerator } from "../../../src/validators/ZodObject";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodObjectValidationGenerator);

describe('ZodObject', () => {
    addTestCase('base case', {
        zodSchema: z.object({string: z.string()}),
        validInputs: [
            {string: 'some string'}
        ],
        invalidInputs: [
            {},
            'some string'
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string'],
            properties: {
                string: {
                    bsonType: 'string'
                }
            },
            additionalProperties: false
        }
    });

    addTestCase('strip unknown keys', {
        zodSchema: z.object({
            string: z.string()
        }).strip(),
        validInputs: [
            {string: 'some string'}
        ],
        invalidInputs: [
            {},
            'some string',
            {string: 'some string', blah: 'bad'}
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string'],
            properties: {
                string: {
                    bsonType: 'string'
                }
            },
            additionalProperties: false
        }
    });

    addTestCase('strict unknown keys', {
        zodSchema: z.object({
            string: z.string()
        }).strict(),
        validInputs: [
            {string: 'some string'}
        ],
        invalidInputs: [
            {},
            'some string',
            {string: 'some string', blah: 'bad'}
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string'],
            properties: {
                string: {
                    bsonType: 'string'
                }
            },
            additionalProperties: false
        }
    });

    addTestCase('passthrough unknown keys', {
        zodSchema: z.object({
            string: z.string()
        }).passthrough(),
        validInputs: [
            {string: 'some string'},
            {string: 'some string', blah: 'good'}
        ],
        invalidInputs: [
            {},
            'some string',
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string'],
            properties: {
                string: {
                    bsonType: 'string'
                }
            },
            additionalProperties: true
        }
    });

    addTestCase('catchall type', {
        zodSchema: z.object({
            string: z.string()
        }).catchall(z.string()),
        validInputs: [
            { string: 'some string', blah: 'good' },
        ],
        invalidInputs: [
            { string: 'some string', blah: 123 },
            { blah: 'good' },
            'some string',
            {}
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string'],
            properties: {
                string: {
                    bsonType: 'string'
                }
            },
            additionalProperties: {
                bsonType: 'string'
            }
        }
    });

    addTestCase('catchall type overwrites unknown keys', {
        zodSchema: z.object({
            string: z.string()
        }).strip().catchall(z.string()),
        validInputs: [
            { string: 'some string', blah: 'good' },
        ],
        invalidInputs: [
            { string: 'some string', blah: 123 },
            { blah: 'good' },
            'some string',
            {}
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string'],
            properties: {
                string: {
                    bsonType: 'string'
                }
            },
            additionalProperties: {
                bsonType: 'string'
            }
        }
    });

    addTestCase('optional fields', {
        zodSchema: z.object({
            string1: z.string(),
            string2: z.string().optional()
        }),
        validInputs: [
            {string1: 'string1'},
            {string1: 'string1', string2: 'string2'}
        ],
        invalidInputs: [
            {string2: 'string2'},
            {string1: 'string1', string2: 123},
            'string'
        ],
        expectedValidatorSchema: {
            bsonType: 'object',
            required: ['string1'],
            properties: {
                string1: {
                    bsonType: 'string'
                },
                string2: {
                    bsonType: 'string'
                }
            },
            additionalProperties: false
        }
    })
});