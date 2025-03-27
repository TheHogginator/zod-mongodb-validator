import { ZodIntersection } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodIntersectionValidationGenerator = basicGenerator({
    type: ZodIntersection<any, any>,
    addDescription: true,
    generator: (type, { getSubSchema, GenerationError }) => {
        const left = getSubSchema(type._def.left, '[left]');
        const right = getSubSchema(type._def.right, '[right]');
        if(!left) {
            throw new GenerationError('No schema for left hand side of intersection');
        }
        if(!right) {
            throw new GenerationError('No schema for right hand side of intersection');
        }
        return {
            $jsonSchema: {
                allOf: [
                    left.$jsonSchema,
                    right.$jsonSchema
                ]
            }
        }
    }
})
