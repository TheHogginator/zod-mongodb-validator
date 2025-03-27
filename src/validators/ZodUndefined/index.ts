import { ZodUndefined } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodUndefinedValidationGenerator = basicGenerator({
    type: ZodUndefined,
    addDescription: true,
    generator: (_, {GenerationError, options}) => {
        if(options.undefinedToNull === true) {
            return {
                $jsonSchema: { bsonType: 'null' }
            }
        }
        throw new GenerationError('Undefined is not a valid MongoDB value, use nulls instead')
    }
})