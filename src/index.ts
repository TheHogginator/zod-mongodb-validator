import { ZodType } from "zod";
import { GenerationError } from "./GenerationError";
import type { GeneratorOptions, GeneratorResult, ValidationGenerator } from "./types/Generator";
import { DEFAULT_VALIDATORS } from "./validators/DEFAULT_VALIDATORS";

export const zodToMongoDBValidator = (
    type: ZodType,
    parsers: Array<ValidationGenerator<any>> = DEFAULT_VALIDATORS,
    options: GeneratorOptions = {}
): GeneratorResult => {
    const getSubSchemaFactory = (rootPath: string[], seen: Array<ZodType>) => {
        return (type: ZodType, pathEntry: string): GeneratorResult | null => {
            const path = [...rootPath, pathEntry];
            if(seen.includes(type)) {
                throw new GenerationError(`Recursive types aren't convertable to a MongoDB validation schema`, path);
            }
            const utils = {
                getSubSchema: getSubSchemaFactory(path, [...seen, type]),
                options,
                GenerationError: class extends GenerationError {
                    constructor(message: string) {
                        super(message, path)
                    }
                }
            }
            for (const parser of parsers) {
                const result = parser(type, utils);
                if (result === undefined) { continue; }
                if (result === null) { return null; }
                return result;
            }
            return null;
        }
    }

    const result = getSubSchemaFactory([], [])(type, '$');
    if (!result) {
        throw new GenerationError('No schema', ['$'])
    }
    return result;
}
