import type { ZodType } from "zod";
import type { ValidationGenerator } from "./types/Generator";

export const basicGenerator = <TType extends ZodType>({
    type: CheckType,
    addDescription,
    generator
}: {
    type: abstract new (...args: any) => TType,
    addDescription: boolean,
    generator: ValidationGenerator<TType>
}): ValidationGenerator => {
    return (type, utils) => {
        if (type instanceof CheckType === false) { return undefined; }
        const result = generator(type, utils);
        if (!result) { return result; }
        if (type.description && addDescription) {
            return { $jsonSchema: { ...result.$jsonSchema, description: type.description } }
        }
        return result;
    }
}