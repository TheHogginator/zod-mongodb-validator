import { ZodEnum } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodEnumValidationGenerator = basicGenerator({
    type: ZodEnum<any>,
    addDescription: true,
    generator: (type) => {
        return {
            $jsonSchema: {
                enum: type._def.values
            }
        }
    }
})
