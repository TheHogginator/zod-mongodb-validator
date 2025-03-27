import { ZodPipeline } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodPipelineValidationGenerator = basicGenerator({
    type: ZodPipeline<any, any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        return getSubSchema(type._def.out, '[pipeline output]');
    }
})