import { datetimeRegex, ZodString, type ZodStringCheck } from "zod";
import type { MongoDBJSONSchemaString } from "../../types/MongoDBJSONSchema";
import { basicGenerator } from "../../basicGenerator";
import { escapeRegex } from './escapeRegex';
import { base64Regex, base64urlRegex, cidrRegex, cuid2Regex, cuidRegex, dateRegex, durationRegex, emailRegex, emojiRegex, ipRegex, ipv4CidrRegex, ipv4Regex, ipv6CidrRegex, ipv6Regex, jwtRegex, nanoidRegex, timeRegex, ulidRegex, uuidRegex } from "./regexes";

/**
 * Zod uses `new URL()` to validate the URLs I think this regex covers the basics.
 * It will let through some invalid values but a full regex for a URI isn't
 * really an option.
 */
const urlRegex = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\/[^\s\/$.?#].[^\s]*$/;

const addCheck = (check: ZodStringCheck, validator: MongoDBJSONSchemaString): MongoDBJSONSchemaString => {
    switch (check.kind) {
        case 'base64': {
            return { ...validator, pattern: base64Regex.source };
        }
        case 'base64url': {
            return { ...validator, pattern: base64urlRegex.source };
        }
        case 'cidr': {
            switch (check.version) {
                case 'v4': {
                    return { ...validator, pattern: ipv4CidrRegex.source };
                }
                case 'v6': {
                    return { ...validator, pattern: ipv6CidrRegex.source };
                }
                case undefined: {
                    return { ...validator, pattern: cidrRegex.source };
                }
            }
        }
        case 'cuid': {
            return { ...validator, pattern: cuidRegex.source };
        }
        case 'cuid2': {
            return { ...validator, pattern: cuid2Regex.source };
        }
        case 'date': {
            return { ...validator, pattern: dateRegex.source };
        }
        case 'datetime': {
            return { ...validator, pattern: datetimeRegex(check).source };
        }
        case 'duration': {
            return { ...validator, pattern: durationRegex.source };
        }
        case 'email': {
            return { ...validator, pattern: emailRegex.source };
        }
        case 'emoji': {
            return { ...validator, pattern: emojiRegex.source };
        }
        case 'endsWith': {
            return { ...validator, pattern: `${escapeRegex(check.value)}$` };
        }
        case 'includes': {
            return { ...validator, pattern: `^.{${check.position || 0}}.*${escapeRegex(check.value)}` };
        }
        case 'ip': {
            switch (check.version) {
                case 'v4': {
                    return {...validator, pattern: ipv4Regex.source};
                }
                case 'v6': {
                    return {...validator, pattern: ipv6Regex.source};
                }
                case undefined: {
                    return {...validator, pattern: ipRegex.source};
                }
            }
        }
        case 'jwt': {
            return { ...validator, pattern: jwtRegex.source };
        }
        case 'length': {
            return {
                ...validator,
                minLength: check.value,
                maxLength: check.value
            };
        }
        case 'max': {
            return { ...validator, maxLength: check.value };
        }
        case 'min': {
            return { ...validator, minLength: check.value };
        }
        case 'nanoid': {
            return { ...validator, pattern: nanoidRegex.source };
        }
        case 'regex': {
            return { ...validator, pattern: check.regex.source };
        }
        case 'startsWith': {
            return { ...validator, pattern: `^${escapeRegex(check.value)}` };
        }
        case 'time': {
            return { ...validator, pattern: timeRegex(check).source };
        }
        case 'toLowerCase': {
            // Not sure, we could add a validation to check the string is all lower case?
            return validator;
        }
        case 'toUpperCase': {
            // Not sure, we could add a validation to check the string is all upper case?
            return validator;
        }
        case 'trim': {
            // Not sure, we could add a validation to check the string is trimmed?
            return validator;
        }
        case 'ulid': {
            return {...validator, pattern: ulidRegex.source};
        }
        case 'url': {
            return {...validator, pattern: urlRegex.source};
        }
        case 'uuid': {
            return {...validator, pattern: uuidRegex.source};
        }
    }
}

export const zodStringValidationGenerator = basicGenerator({
    type: ZodString,
    addDescription: true,
    generator: (type) => {
        const validator: MongoDBJSONSchemaString = { bsonType: 'string' };
    
        const withChecks = type._def.checks.reduce((validator, check) => {
            return addCheck(check, validator);
        }, validator);
    
        return {
            $jsonSchema: withChecks
        }
    }
})