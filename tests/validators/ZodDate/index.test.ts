import { describe } from "node:test";
import { z } from "zod";
import { zodDateValidationGenerator } from "../../../src/validators/ZodDate";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodDateValidationGenerator);

describe('ZodDate', () => {
    addTestCase('base case', {
        zodSchema: z.date(),
        validInputs: [
            new Date(),
            new Date('2025-03-25T19:00:00.000Z')
        ],
        invalidInputs: [
            '2022-08-31',
            123456
        ],
        expectedValidatorSchema: {
            bsonType: 'date'
        }
    });
});