import { ZodNumber, ZodNumberCheck } from "zod"
import { basicGenerator } from "../../basicGenerator";
import type { MongoDBJSONSchema, MongoDBJSONSchemaNumber, NumberValidations } from "../../types/MongoDBJSONSchema";

type Numerical = Extract<MongoDBJSONSchema, NumberValidations>

const addCheck = (check: ZodNumberCheck, validator: Numerical): Numerical => {
    switch (check.kind) {
        case 'finite': {
            /**
             * I'm as suprised as you are that this works 😆
             */
            return {
                ...validator,
                bsonType: 'number',
                minimum: -Infinity,
                exclusiveMinimum: true,
                maximum: Infinity,
                exclusiveMaximum: true
            };
        }
        case 'int': {
            return {
                ...validator,
                bsonType: 'int'
            }
        }
        case 'max': {
            if(check.inclusive) {
                return {
                    ...validator,
                    maximum: check.value
                }
            } else {
                return {
                    ...validator,
                    maximum: check.value,
                    exclusiveMaximum: true
                }
            }
        }
        case 'min': {
            if(check.inclusive) {
                return {
                    ...validator,
                    minimum: check.value
                }
            } else {
                return {
                    ...validator,
                    minimum: check.value,
                    exclusiveMinimum: true
                }
            }
        }
        case 'multipleOf': {
            return {
                ...validator,
                multipleOf: check.value
            }
        }
    }
}

export const zodNumberValidationGenerator = basicGenerator({
    type: ZodNumber,
    addDescription: true,
    generator: (type) => {
        const validator: MongoDBJSONSchema = type._def.checks.reduce((validator, check) => {
            return addCheck(check, validator)
        }, {bsonType: 'number'} as Numerical);
        return {
            $jsonSchema: validator
        }
    }
})