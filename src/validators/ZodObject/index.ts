import { ZodNever, ZodObject, ZodOptional, type ZodType } from "zod";
import { basicGenerator } from "../../basicGenerator";
import type { MongoDBJSONSchemaObject } from "../../types/MongoDBJSONSchema";

export const zodObjectValidationGenerator = basicGenerator({
    type: ZodObject<any, any, any, { [x: string]: any; }, { [x: string]: any; }>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        const validator: MongoDBJSONSchemaObject = {
            bsonType: 'object',
        }
        // I think false is most logical for strip(the default) as if you had
        // validated an object with the schema additional properties would not exist.
        //
        // This does have an annoying interaction with intersections where you explicitly
        // need to mark the intersection members as passthrough if their keys differ
        switch (type._def.unknownKeys || 'strip') {
            case 'strip': {
                validator.additionalProperties = false;
                break;
            }
            case 'strict': {
                validator.additionalProperties = false;
                break;
            }
            case 'passthrough': {
                validator.additionalProperties = true;
                break;
            }
            default: {
                validator.additionalProperties = false;
            }
        }
        if(type._def.catchall instanceof ZodNever === false) {
            const catchAllSchema = getSubSchema(type._def.catchall, '[catchall]');
            if(catchAllSchema) {
                validator.additionalProperties = catchAllSchema.$jsonSchema;
            }
        }
        const shape = type._def.shape() as {[key: string]: ZodType};
        const withShape = Object.entries(shape).reduce((validator, [key, property]) => {
            if(property instanceof ZodOptional) {
                const subSchema = getSubSchema(property._def.innerType, `.${key}`);
                if(!subSchema) { return validator; }
                return {
                    ...validator,
                    properties: {
                        ...(validator.properties || {}),
                        [key]: subSchema.$jsonSchema
                    }
                }
            } else {
                const subSchema = getSubSchema(property, `.${key}`);
                if(!subSchema) { return validator; }
                return {
                    ...validator,
                    required: [
                        ...(Array.isArray(validator.required) ? validator.required : []),
                        key
                    ],
                    properties: {
                        ...(validator.properties || {}),
                        [key]: subSchema.$jsonSchema
                    }
                }
            }
        }, validator);
    
        return {
            $jsonSchema: withShape
        }
    }
})