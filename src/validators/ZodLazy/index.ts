import { ZodLazy } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodLazyValidationGenerator = basicGenerator({
    type: ZodLazy<any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        return getSubSchema(type._def.getter(), '[lazy]')
    }
})