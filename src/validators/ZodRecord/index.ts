import { ZodRecord } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodRecordValidationGenerator = basicGenerator({
    type: ZodRecord<any, any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        /**
         * We could look at pattern properties if the keySchema is a string like z.string().uuid()
         * but that might be overkill.
         */
        const subSchema = getSubSchema(type.valueSchema, '[RecordValue]');
        if(!subSchema) { return null; }
        return {
            $jsonSchema: {
                bsonType: 'object',
                additionalProperties: subSchema.$jsonSchema
            }
        }
    }
})