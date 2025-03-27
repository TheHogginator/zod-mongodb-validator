import { describe, it } from "node:test";
import { MockUtils } from "../utils";
import { zodBigIntValidationGenerator } from "../../../src/validators/ZodBigInt";
import assert from "node:assert";
import { z } from "zod";

describe('ZodBigInt', () => {
    it('should throw a generation error', () => {
        assert.throws(() => {
            zodBigIntValidationGenerator(z.bigint(), MockUtils);
        }, MockUtils.GenerationError)
    })
})