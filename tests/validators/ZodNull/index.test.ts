import { describe } from "node:test";
import { z } from "zod";
import { zodNullValidationGenerator } from "../../../src/validators/ZodNull";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodNullValidationGenerator);

describe('ZodNull', () => {
    addTestCase('base case', {
        zodSchema: z.null(),
        validInputs: [
            null,
            /**
             * MongoDB by default will convert undefiend to null
             * @see https://www.mongodb.com/docs/drivers/node/current/fundamentals/bson/undefined-values/ 
             */
            undefined 
        ],
        invalidInputs: [
            '',
            0
        ],
        expectedValidatorSchema: {
            bsonType: 'null'
        }
    })
});