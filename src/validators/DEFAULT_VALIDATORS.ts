import { zodAnyValidationGenerator } from "./ZodAny";
import { zodArrayValidationGenerator } from "./ZodArray";
import { zodBigIntValidationGenerator } from "./ZodBigInt";
import { zodBooleanValidationGenerator } from "./ZodBoolean";
import { zodBrandedValidationGenerator } from "./ZodBranded";
import { zodDateValidationGenerator } from "./ZodDate";
import { zodDiscriminatedUnionValidationGenerator } from "./ZodDiscriminatedUnion";
import { zodEnumValidationGenerator } from "./ZodEnum";
import { zodIntersectionValidationGenerator } from "./ZodIntersection";
import { zodLazyValidationGenerator } from "./ZodLazy";
import { zodLiteralValidationGenerator } from "./ZodLiteral";
import { zodNaNValidationGenerator } from "./ZodNaN";
import { zodNativeEnumValidationGenerator } from "./ZodNativeEnum";
import { zodNullValidationGenerator } from "./ZodNull";
import { zodNullableValidationGenerator } from "./ZodNullable";
import { zodNumberValidationGenerator } from "./ZodNumber";
import { zodObjectValidationGenerator } from "./ZodObject";
import { zodOptionalValidationGenerator } from "./ZodOptional";
import { zodPipelineValidationGenerator } from "./ZodPipeline";
import { zodReadonlyValidationGenerator } from "./ZodReadonly";
import { zodRecordValidationGenerator } from "./ZodRecord";
import { zodStringValidationGenerator } from "./ZodString";
import { zodTupleValidationGenerator } from "./ZodTuple";
import { zodUndefinedValidationGenerator } from "./ZodUndefined";
import { zodUnionValidationGenerator } from "./ZodUnion";
import { zodUnknownValidationGenerator } from "./ZodUnknown";

export const DEFAULT_VALIDATORS = [
    zodAnyValidationGenerator,
    zodArrayValidationGenerator,
    zodBigIntValidationGenerator,
    zodBooleanValidationGenerator,
    zodBrandedValidationGenerator,
    zodDateValidationGenerator,
    zodDiscriminatedUnionValidationGenerator,
    zodEnumValidationGenerator,
    zodIntersectionValidationGenerator,
    zodLazyValidationGenerator,
    zodLiteralValidationGenerator,
    zodNaNValidationGenerator,
    zodNativeEnumValidationGenerator,
    zodNullValidationGenerator,
    zodNullableValidationGenerator,
    zodNumberValidationGenerator,
    zodObjectValidationGenerator,
    zodOptionalValidationGenerator,
    zodPipelineValidationGenerator,
    zodReadonlyValidationGenerator,
    zodRecordValidationGenerator,
    zodStringValidationGenerator,
    zodTupleValidationGenerator,
    zodUndefinedValidationGenerator,
    zodUnionValidationGenerator,
    zodUnknownValidationGenerator,
]