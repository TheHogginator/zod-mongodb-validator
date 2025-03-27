# zod-mongodb-validator
Generate MongoDB Validator schemas from your Zod schemas.

[MongoDB validators](https://www.mongodb.com/docs/manual/core/schema-validation/)
use a version of JSONSchema based on [draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04)
, it has some [omitted properties](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#std-label-json-schema-omission) and some [extensions](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#std-label-jsonSchema-extension).  Primarily the recommended use of
bsonType instead of type.  The purpose of this library is to convert zod schemas
into MongoDB validators.

## Usage
```typescript
import { z } from "zod";
import { zodToMongoDBValidator } from "@thehogginator/zod-mongodb-validator";

const schema = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    email: z.string().email().nullable()
}).describe('User');

assert.deepStrictEqual(
    zodToMongoDBValidator(schema), 
    {
        $jsonSchema: {
            bsonType: 'object',
            description: 'Users',
            required: ['firstName', 'lastName', 'email'],
            properties: {
                firstName: {bsonType: 'string', minLength: 3, maxLength: 100},
                lastName: {bsonType: 'string', minLength: 3, maxLength: 100},
                email: {
                    oneOf: [
                        {bsonType: 'string', pattern: 'THE_EMAIL_REGEX'},
                        {bsonType: 'null'}
                    ]
                }
            },
            additionalProperties: false
        }
    }
)
```

## Adding a custom parser
You can pass the array of parsers to use as the 2nd argument to the
zodToMongoDBValidator function, this allows you to omit parsers you don't want
or add custom parsers for custom data types.
```typescript
const zonedDateTime = z.custom<Temporal.ZonedDateTime>();
const schema = z.schema({
    eventType: z.enum(['Created', 'Updated', 'Deleted']),
    when: zonedDateTime
});

const generators = [...DEFAULT_GENERATORS, (type) => {
    // Returning undefined indicates this generator doesn't handle the type
    if(type !== zonedDateTime) { return undefined; } 
    return {
        $jsonSchema: {
            bsonType: 'string',
            pattern: '^some-zoned-datetime-pattern$'
        }
    }
}]
```

## Handling ObjectId

## Running the tests
The test run against an actual MongoDB instance to give more confidence around
the output.  To run the tests Spin up the project in the dev container to get
an instance of MongoDB and then run the tests.