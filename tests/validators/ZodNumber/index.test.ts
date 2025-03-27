import { describe } from "node:test";
import { z } from "zod";
import { zodNumberValidationGenerator } from "../../../src/validators/ZodNumber";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodNumberValidationGenerator);

describe('ZodNumber', () => {
    addTestCase('base case', {
        zodSchema: z.number(),
        validInputs: [
            123,
            12.5,
            1e4,
            0b01,
            0xFF
        ],
        invalidInputs: [
            '123',
        ],
        expectedValidatorSchema: {
            bsonType: 'number'
        }
    })

    addTestCase('int validation', {
        zodSchema: z.number().int(),
        validInputs: [
            123,
            1e4,
            0b01,
            0xFF
        ],
        invalidInputs: [
            '123',
            12.5,
        ],
        expectedValidatorSchema: {
            bsonType: 'int'
        }
    });

    addTestCase('max validation', {
        zodSchema: z.number().max(3),
        validInputs: [
            1,
            2,
            3
        ],
        invalidInputs: [
            4,
            5,
            6
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
            maximum: 3
        }
    });

    addTestCase('max(exclusive) validation', {
        zodSchema: z.number().lt(4),
        validInputs: [
            1,
            2,
            3
        ],
        invalidInputs: [
            4,
            5,
            6
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
            exclusiveMaximum: true,
            maximum: 4
        }
    });

    addTestCase('min validation', {
        zodSchema: z.number().min(3),
        validInputs: [
            3,
            4,
            5
        ],
        invalidInputs: [
            0,
            1,
            2
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
            minimum: 3
        }
    });

    addTestCase('min(exclusive) validation', {
        zodSchema: z.number().gt(2),
        validInputs: [
            3,
            4,
            5
        ],
        invalidInputs: [
            0,
            1,
            2
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
            exclusiveMinimum: true,
            minimum: 2
        }
    });

    addTestCase('multipleOf validation', {
        zodSchema: z.number().multipleOf(2),
        validInputs: [
            2,
            4,
            10,
            100
        ],
        invalidInputs: [
            1,
            5,
            11,
            99
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
            multipleOf: 2
        }
    })

    addTestCase('finite validation', {
        zodSchema: z.number().finite(),
        validInputs: [
            0,
            -900,
            Number.MAX_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER
        ],
        invalidInputs: [
            Infinity,
            -Infinity,
            '123456'
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
            maximum: Infinity,
            exclusiveMaximum: true,
            minimum: -Infinity,
            exclusiveMinimum: true
        }
    })
});