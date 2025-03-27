import { ZodUnknown } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodUnknownValidationGenerator = basicGenerator({
    type: ZodUnknown,
    addDescription: true,
    generator: () => {
        return {
            $jsonSchema: {}
        }
    }
})