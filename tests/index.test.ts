import { describe, it } from "node:test";
import { z } from "zod";
import { zodToMongoDBValidator } from "../src/index";
import assert from "node:assert";

describe('zodToMongoDBSchema', () => {
    it('should properly generate subschemas', () => {
        const schema = z.array(z.array(z.any()));
        const generated = zodToMongoDBValidator(schema);
        assert.deepStrictEqual(generated, {
            $jsonSchema: {
                bsonType: 'array',
                items: {
                    bsonType: 'array',
                    items: {},
                    additionalItems: false,
                },
                additionalItems: false,
            }
        })
    })
})