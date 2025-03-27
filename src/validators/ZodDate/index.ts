import { ZodDate, type ZodDateCheck } from "zod";
import { basicGenerator } from "../../basicGenerator";
import type { MongoDBJSONSchemaDate } from "../../types/MongoDBJSONSchema";

export const zodDateValidationGenerator = basicGenerator({
    type: ZodDate,
    addDescription: true,
    generator: (type, {GenerationError}) => {
        const addCheck = (check: ZodDateCheck, _validator: MongoDBJSONSchemaDate): MongoDBJSONSchemaDate => {
            // TODO max and min aren't supported in mongodb we could look at using $expr validations on top
            // of the JSONSchema?
            switch (check.kind) {
                case 'max': {
                    throw new GenerationError("min validation for ZodDate isn't supported");
                }
                case 'min': {
                    throw new GenerationError("min validation for ZodDate isn't supported");
                }
            }
        }

        const validator: MongoDBJSONSchemaDate = type._def.checks.reduce((validator, check) => {
            return addCheck(check, validator);
        }, { bsonType: 'date' } as MongoDBJSONSchemaDate);
    
        return {
            $jsonSchema: validator
        }
    }
})