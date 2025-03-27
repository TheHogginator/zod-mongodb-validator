import { ZodOptional } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodOptionalValidationGenerator = basicGenerator({
    type: ZodOptional<any>,
    addDescription: true,
    generator: (type, {GenerationError, options, getSubSchema}) => {
        if(options.undefinedToNull === true) {
            const subSchema = getSubSchema(type._def.innerType, '[nullable]');
            if(!subSchema) {
                return {
                    $jsonSchema: { bsonType: 'null' }
                }
            }
            return {
                $jsonSchema: {
                    oneOf: [
                        subSchema.$jsonSchema,
                        {bsonType: 'null'}
                    ]
                }
            }
        }
        throw new GenerationError('Undefined is not a valid MongoDB value, use nulls instead')
    }
})