import { ZodAny } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodAnyValidationGenerator = basicGenerator({
    type: ZodAny,
    addDescription: true,
    generator: () => {
        return {$jsonSchema: {}}
    }
})