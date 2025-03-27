import { ZodBranded } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodBrandedValidationGenerator = basicGenerator({
    type: ZodBranded<any, any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        return getSubSchema(type._def.type, 'branded.')
    }
})