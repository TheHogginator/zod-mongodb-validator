import { ZodLiteral } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodLiteralValidationGenerator = basicGenerator({
    type: ZodLiteral<any>,
    addDescription: true,
    generator: (type) => {
        return {
            $jsonSchema: {
                enum: [type.value]
            }
        }
    }
})