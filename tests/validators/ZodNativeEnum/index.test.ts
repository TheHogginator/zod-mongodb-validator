import { describe } from "node:test";
import { z } from "zod";
import { zodNativeEnumValidationGenerator } from "../../../src/validators/ZodNativeEnum";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodNativeEnumValidationGenerator);

describe('ZodNativeEnum', () => {
    enum RegularEnum {
        A,
        B,
        C
    }
    addTestCase('base case', {
        zodSchema: z.nativeEnum(RegularEnum),
        validInputs: [
            RegularEnum.A,
            RegularEnum.B,
            RegularEnum.C,
            0,
            1,
            2
        ],
        invalidInputs: [
            5,
            'A'
        ],
        expectedValidatorSchema: {
            enum: [0, 1, 2]
        }
    });

    enum StringValuesEnum {
        A="a",
        B="b",
        C="c"
    }
    addTestCase('string enum case', {
        zodSchema: z.nativeEnum(StringValuesEnum),
        validInputs: [
            StringValuesEnum.A,
            StringValuesEnum.B,
            StringValuesEnum.C,
            'a',
            'b',
            'c'
        ],
        invalidInputs: [
            0,
            'd'
        ],
        expectedValidatorSchema: {
            enum: ['a', 'b', 'c']
        }
    });

    enum MixedValueEnum {
        A,
        B='b',
        C='c'
    }
    addTestCase('mixed enum case', {
        zodSchema: z.nativeEnum(MixedValueEnum),
        validInputs: [
            MixedValueEnum.A,
            MixedValueEnum.B,
            MixedValueEnum.C,
            0,
            'b',
            'c'
        ],
        invalidInputs: [
            5,
            1,
            'd'
        ],
        expectedValidatorSchema: {
            enum: [0, 'b', 'c']
        }
    });
});