import { ZodDiscriminatedUnion, type ZodType } from "zod";
import { basicGenerator } from "../../basicGenerator";

// JSONSchema4 doesn't support discriminated unions so just do regular union logic
export const zodDiscriminatedUnionValidationGenerator = basicGenerator({
    type: ZodDiscriminatedUnion<any, any>,
    addDescription: true,
    generator: (type, {getSubSchema, GenerationError}) => {
        const options = (type.options as ZodType[]).map((option, index) => {
            return getSubSchema(option, `.union[${index}]`);
        }).filter((subSchema) => {
            return subSchema !== null
        })
        .map(subSchema => {
            return subSchema.$jsonSchema;
        })
        if(options.length === 0) {
            throw new GenerationError('Union has no members');
        }
        return {
            $jsonSchema: {
                anyOf: options
            }
        } 
    }
})