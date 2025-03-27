import { ZodNullable } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodNullableValidationGenerator = basicGenerator({
    type: ZodNullable<any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        const subSchema = getSubSchema(type._def.innerType, '[nullable]');
        if(!subSchema) {
            return {
                $jsonSchema: {
                    bsonType: 'null'
                }
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
})