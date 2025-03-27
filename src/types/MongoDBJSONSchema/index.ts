export interface MongoDBJSONSchemaAny extends AnyMetadata, AnyValidations {
    bsonType?: never;
}

export interface MongoDBJSONSchemaArray extends AnyMetadata, AnyValidations, ArrayValidations {
    bsonType: 'array';
}

export interface MongoDBJSONSchemaBinData extends AnyMetadata, AnyValidations {
    bsonType: 'binData';
}

export interface MongoDBJSONSchemaBool extends AnyMetadata, AnyValidations {
    bsonType: 'bool';
}

export interface MongoDBJSONSchemaDate extends AnyMetadata, AnyValidations {
    bsonType: 'date';
}

export interface MongoDBJSONSchemaDecimal extends AnyMetadata, AnyValidations, NumberValidations {
    bsonType: 'decimal';
}

export interface MongoDBJSONSchemaDouble extends AnyMetadata, AnyValidations, NumberValidations {
    bsonType: 'double';
}

export interface MongoDBJSONSchemaInt extends AnyMetadata, AnyValidations, NumberValidations {
    bsonType: 'int';
}

export interface MongoDBJSONSchemaLong extends AnyMetadata, AnyValidations, NumberValidations {
    bsonType: 'long';
}

export interface MongoDBJSONSchemaNull extends AnyMetadata, AnyValidations {
    bsonType: 'null';
}

export interface MongoDBJSONSchemaNumber extends AnyMetadata, AnyValidations, NumberValidations {
    bsonType: 'number';
}

export interface MongoDBJSONSchemaObject extends AnyMetadata, AnyValidations, ObjectValidations {
    bsonType: 'object';
}

export interface MongoDBJSONSchemaObjectId extends AnyMetadata, AnyValidations {
    bsonType: 'objectId';
}

export interface MongoDBJSONSchemaRegex extends AnyMetadata, AnyValidations {
    bsonType: 'regex';
}

export interface MongoDBJSONSchemaString extends AnyMetadata, AnyValidations, StringValidations {
    bsonType: 'string';
}

// TODO Maybe number validations?
export interface MongoDBJSONSchemaTimestamp extends AnyMetadata, AnyValidations {
    bsonType: 'timestamp';
}

export type MongoDBJSONSchema =
    | MongoDBJSONSchemaAny
    | MongoDBJSONSchemaArray
    | MongoDBJSONSchemaBinData
    | MongoDBJSONSchemaBool
    | MongoDBJSONSchemaDate
    | MongoDBJSONSchemaDecimal
    | MongoDBJSONSchemaDouble
    | MongoDBJSONSchemaInt
    | MongoDBJSONSchemaLong
    | MongoDBJSONSchemaNull
    | MongoDBJSONSchemaNumber
    | MongoDBJSONSchemaObject
    | MongoDBJSONSchemaObjectId
    | MongoDBJSONSchemaRegex
    | MongoDBJSONSchemaString
    | MongoDBJSONSchemaTimestamp;

interface AnyMetadata {
    title?: string,
    description?: string
}

type PrimitiveType =
    | string
    | number
    | boolean
    | { [key: string]: PrimitiveType }
    | PrimitiveType[]
    | null;
export interface AnyValidations {
    enum?: PrimitiveType[],
    allOf?: MongoDBJSONSchema[],
    anyOf?: MongoDBJSONSchema[],
    oneOf?: MongoDBJSONSchema[],
    not?: MongoDBJSONSchema,
}

export interface NumberValidations {
    multipleOf?: number,
    maximum?: number,
    exclusiveMaximum?: boolean,
    minimum?: number,
    exclusiveMinimum?: boolean
}

export interface StringValidations {
    maxLength?: number,
    minLength?: number,
    pattern?: string,
}

export interface ObjectValidations {
    maxProperties?: number,
    minProperties?: number,
    required?: string[],
    additionalProperties?: boolean | MongoDBJSONSchema,
    properties?: {[key: string]: MongoDBJSONSchema},
    patternProperties?: {[pattern: string]: MongoDBJSONSchema},
}

export interface ArrayValidations {
    items?: MongoDBJSONSchema | MongoDBJSONSchema[],
    additionalItems?: boolean | MongoDBJSONSchema,
    maxItems?: number,
    minItems?: number,
    uniqueItems?: boolean,
}
