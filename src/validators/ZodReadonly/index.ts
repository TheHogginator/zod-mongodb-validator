import { ZodReadonly } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodReadonlyValidationGenerator = basicGenerator({
    type: ZodReadonly<any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        return getSubSchema(type._def.innerType, '[readonly]');
    }
})