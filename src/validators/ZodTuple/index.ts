import { ZodTuple, type ZodType } from "zod";
import { basicGenerator } from "../../basicGenerator";

export const zodTupleValidationGenerator = basicGenerator({
    type: ZodTuple<any>,
    addDescription: true,
    generator: (type, {getSubSchema}) => {
        const items = (type.items as Array<ZodType>)
            .map((item, index) => getSubSchema(item, `[${index}]`))
            .filter(subSchema => subSchema !== null)
            .map(subSchema => subSchema.$jsonSchema);
        if(!items.length) { return null; }
        return {
            $jsonSchema: {
                bsonType: 'array',
                items,
                maxItems: items.length,
                minItems: items.length
            }
        }
    }
})
