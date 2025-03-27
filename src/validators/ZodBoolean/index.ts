import { ZodBoolean } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodBooleanValidationGenerator = basicGenerator({
    type: ZodBoolean,
    addDescription: true,
    generator: () => {
        return {
            $jsonSchema: {
                bsonType: 'bool'
            }
        }
    }
})