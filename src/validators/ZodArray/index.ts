import { ZodArray } from "zod";
import { basicGenerator } from "../../basicGenerator";
import type { MongoDBJSONSchemaArray } from "../../types/MongoDBJSONSchema";

export const zodArrayValidationGenerator = basicGenerator({
    type: ZodArray<any, any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        const validator: MongoDBJSONSchemaArray = {
            bsonType: 'array',
            additionalItems: false
        }
        if(type._def.minLength !== null) {
            validator.minItems = type._def.minLength.value;
        }
        if(type._def.maxLength !== null) {
            validator.maxItems = type._def.maxLength.value;
        }
        if(type._def.exactLength !== null) {
            validator.minItems = type._def.exactLength.value;
            validator.maxItems = type._def.exactLength.value;
        }
        const items = getSubSchema(type.element, '[number]');
        if(items === null) {
            return {
                $jsonSchema: validator
            }
        }
        return {
            $jsonSchema: {
                ...validator,
                items: items.$jsonSchema
            }
        };
    }
})