import { describe } from "node:test";
import { z } from "zod";
import { zodPipelineValidationGenerator } from "../../../src/validators/ZodPipeline";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodPipelineValidationGenerator);

describe('ZodPipeline', () => {
    addTestCase('base case', {
        zodSchema: z.string().pipe(z.coerce.number()),
        validInputs: [
            123,
        ],
        invalidInputs: [
            '123'
        ],
        expectedValidatorSchema: {
            bsonType: 'number',
        }
    })
});