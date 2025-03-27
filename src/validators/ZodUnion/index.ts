import { ZodUnion, type ZodType } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodUnionValidationGenerator = basicGenerator({
    type: ZodUnion<any>,
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