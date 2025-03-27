import { ZodBigInt } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodBigIntValidationGenerator = basicGenerator({
    type: ZodBigInt,
    addDescription: true,
    generator: (_, { GenerationError }) => {
        /**
         * MongoDB doesn't support BigInt, I think the best that can be done is to save it as a string
         * but we don't want to change types, using BigInt is likely an error here.
         */
        throw new GenerationError("ZodBigInt isn't convertable to a MongoDB validation schema");
    }
})