import { ZodNull } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodNullValidationGenerator = basicGenerator({
    type: ZodNull,
    addDescription: true,
    generator: () => {
        return {
            $jsonSchema: {
                bsonType: 'null'
            }
        }
    }
})