import { ZodNativeEnum } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodNativeEnumValidationGenerator = basicGenerator({
    type: ZodNativeEnum<any>,
    addDescription: true,
    generator: (type) => {
        const enumValues = Object.keys(type.enum)
            // Exclude reverse mappings (numeric keys)
            .filter((key) => isNaN(Number(key)))
            .map((key) => type.enum[key as keyof typeof type.enum]);

        return {
            $jsonSchema: {
                enum: enumValues
            }
        }
    }
})
