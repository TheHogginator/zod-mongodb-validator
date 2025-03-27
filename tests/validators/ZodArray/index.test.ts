import { z } from "zod"
import { describe } from "node:test"
import { testCaseFactory } from "../utils";
import { zodArrayValidationGenerator } from "../../../src/validators/ZodArray"

const addTestCase = testCaseFactory(zodArrayValidationGenerator);

describe('ZodArray', () => {
    addTestCase('base case', {
        zodSchema: z.array(z.string()),
        validInputs: [
            ['good'],
            []
        ],
        invalidInputs: [
            'bad',
            1
        ],
        expectedValidatorSchema: {
            bsonType: 'array',
            items: {
                bsonType: 'string'
            },
            additionalItems: false
        }
    })

    addTestCase('min length validator', {
        zodSchema: z.array(z.string()).min(3),
        validInputs: [
            ['has', 'three', 'values'],
            ['has', 'more', 'than', 'three', 'values']
        ],
        invalidInputs: [
            ['two', 'values'],
            [],
            'sdf'
        ],
        expectedValidatorSchema: {
            bsonType: 'array',
            minItems: 3,
            items: {
                bsonType: 'string'
            },
            additionalItems: false
        }
    });

    addTestCase('max length validator', {
        zodSchema: z.array(z.string()).max(3),
        validInputs: [
            ['has', 'three', 'values'],
            ['two values'],
            []
        ],
        invalidInputs: [
            ['has', 'four', 'values', '=bad'],
            'sdf'
        ],
        expectedValidatorSchema: {
            bsonType: 'array',
            maxItems: 3,
            items: {
                bsonType: 'string'
            },
            additionalItems: false
        }
    });

    addTestCase('length validator', {
        zodSchema: z.array(z.string()).length(3),
        validInputs: [
            ['has', 'three', 'values'],
        ],
        invalidInputs: [
            ['has', 'four', 'values', '=bad'],
            ['has', 'two'],
            'sdf'
        ],
        expectedValidatorSchema: {
            bsonType: 'array',
            minItems: 3,
            maxItems: 3,
            items: {
                bsonType: 'string'
            },
            additionalItems: false
        }
    });
});
