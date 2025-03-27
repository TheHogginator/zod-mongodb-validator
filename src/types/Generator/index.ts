import type { ZodType } from "zod";
import type { MongoDBJSONSchema } from "../MongoDBJSONSchema";
import type { GenerationError } from "../../GenerationError";

export type GeneratorResult = {
    $jsonSchema: MongoDBJSONSchema,
}

export type GeneratorOptions = {
    /**
     * When true converts encountered undefineds to null, when false throws an error when
     * encountering undefined.  This is necessary as MongoDB doesn't have the same concept
     * of undefined as JavaScript.  Defaults to false.
     * @default false
     * 
     * @example 
     * Optional array elements
     * ```ts
     * const schema = z.array(z.string().optional());
     * assert.deepStrictEqual(toMongoValidator(schema), {undefinedToNull: true}, {
     *     "bsonType": "array",
     *     "items": {
     *         "oneOf": [
     *             {"bsonType": "string"},
     *             {"bsonType": null}
     *         ]
     *     }
     * });
     * assert.throws(() => toMongoValidator(schema, {undefinedToNull: true}), new GenerationError("Undefined is not a valid MongoDB value, use nulls instead"))
     * ```
     * 
     * @example
     * Doesn't affect optional object properties
     * ```ts
     * const schema = z.object({prop: z.string().optional()});
     * assert.deepStrictEqual(toMongoValidator(schema), {undefinedToNull: true}, {
     *     "bsonType": "object",
     *     "properties": {
     *         "prop": {"bsonType": "string"}
     *     }
     * });
     * assert.deepStrictEqual(toMongoValidator(schema), {undefinedToNull: false}, {
     *     "bsonType": "object",
     *     "properties": {
     *         "prop": {"bsonType": "string"}
     *     }
     * });
     * ```
     */
    undefinedToNull?: boolean
}


export type GeneratorUtils = {
    getSubSchema: (type: ZodType, pathEntry: string) => GeneratorResult | null;
    GenerationError: new (message: string) => GenerationError,
    options: GeneratorOptions
}
export type ValidationGenerator<TType extends ZodType = ZodType> 
    = (type: TType, utils: GeneratorUtils) => GeneratorResult | undefined | null;
