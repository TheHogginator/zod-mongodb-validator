import { ZodNaN } from "zod";
import { basicGenerator } from "../../basicGenerator";

/**
 * I don't really know the usecase of using ZodNaN, MongoDB is happy to accept it as a number
 * though so we can generate the schema
 */
export const zodNaNValidationGenerator = basicGenerator({
    type: ZodNaN,
    addDescription: true,
    generator: () => {
        return {
            $jsonSchema: {
                enum: [NaN]
            }
        }
    }
})