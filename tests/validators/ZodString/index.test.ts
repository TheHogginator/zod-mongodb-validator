import { describe } from "node:test";
import { z } from "zod";
import { zodStringValidationGenerator } from "../../../src/validators/ZodString";
import { testCaseFactory } from "../utils";

const addTestCase = testCaseFactory(zodStringValidationGenerator);

describe('ZodString', () => {
    addTestCase('base case', {
        zodSchema: z.string(),
        validInputs: ['ok'],
        invalidInputs: [123],
        expectedValidatorSchema: {
            bsonType: 'string'
        }
    });

    addTestCase('base64 validation', {
        zodSchema: z.string().base64(),
        validInputs: [
            "SGVsbG8gV29ybGQ=",
            "VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw==",
            "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcms=",
            "UGF0aWVuY2UgaXMgdGhlIGtleSB0byBzdWNjZXNz",
            "QmFzZTY0IGVuY29kaW5nIGlzIGZ1bg==",
            "MTIzNDU2Nzg5MA==",
            "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=",
            "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=",
            "ISIkJSMmJyonKCk=",
            "",
            "w7/Dv8O+w74K",
        ],
        invalidInputs: [
            "12345",
            "12345===",
            "SGVsbG8gV29ybGQ",
            "VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw",
            "!UGF0aWVuY2UgaXMgdGhlIGtleSB0byBzdWNjZXNz",
            "?QmFzZTY0IGVuY29kaW5nIGlzIGZ1bg==",
            ".MTIzND2Nzg5MC4=",
            "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo",
            "w7_Dv8O-w74K",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$'
        }
    })

    addTestCase('base64URL validation', {
        zodSchema: z.string().base64url(),
        validInputs: [
            "SGVsbG8gV29ybGQ",
            "SGVsbG8gV29ybGQ=",
            "VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw",
            "VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw==",
            "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcms",
            "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcms=",
            "UGF0aWVuY2UgaXMgdGhlIGtleSB0byBzdWNjZXNz",
            "QmFzZTY0IGVuY29kaW5nIGlzIGZ1bg",
            "QmFzZTY0IGVuY29kaW5nIGlzIGZ1bg==",
            "MTIzNDU2Nzg5MA",
            "MTIzNDU2Nzg5MA==",
            "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo",
            "YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=",
            "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo",
            "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=",
            "ISIkJSMmJyonKCk",
            "ISIkJSMmJyonKCk=",
            "",
            "w7_Dv8O-w74K",
            "123456",
        ],
        invalidInputs: [
            "w7/Dv8O+w74K",
            "12345",
            "12345===",
            "!UGF0aWVuY2UgaXMgdGhlIGtleSB0byBzdWNjZXNz",
            "?QmFzZTY0IGVuY29kaW5nIGlzIGZ1bg==",
            ".MTIzND2Nzg5MC4=",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$'
        }
    });

    addTestCase('cidr validation', {
        zodSchema: z.string().cidr(),
        validInputs: [
            "192.168.0.0/24",
            "10.0.0.0/8",
            "203.0.113.0/24",
            "192.0.2.0/24",
            "127.0.0.0/8",
            "172.16.0.0/12",
            "192.168.1.0/24",
            "fc00::/7",
            "fd00::/8",
            "2001:db8::/32",
            "2607:f0d0:1002:51::4/64",
            "2001:0db8:85a3:0000:0000:8a2e:0370:7334/128",
            "2001:0db8:1234:0000::/64",
        ],
        invalidInputs: [
            "192.168.1.1/33",
            "10.0.0.1/-1",
            "192.168.1.1/24/24",
            "192.168.1.0/abc",
            "2001:db8::1/129",
            "2001:db8::1/-1",
            "2001:db8::1/64/64",
            "2001:db8::1/abc",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\/(3[0-2]|[12]?[0-9])$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$'
        }
    });

    addTestCase('cidr IPv4 validation', {
        zodSchema: z.string().cidr({ version: 'v4' }),
        validInputs: [
            "192.168.0.0/24",
        ],
        invalidInputs: [
            "2001:0db8:85a3::8a2e:0370:7334/64"
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\/(3[0-2]|[12]?[0-9])$'
        }
    });

    addTestCase('cidr IPv6 validation', {
        zodSchema: z.string().cidr({ version: 'v6' }),
        validInputs: [
            "2001:0db8:85a3::8a2e:0370:7334/64",
        ],
        invalidInputs: [
            "192.168.0.0/24",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$'
        }
    });

    addTestCase('cuid validation', {
        zodSchema: z.string().cuid(),
        validInputs: ['ckopqwooh000001la8mbi2im9'],
        invalidInputs: ['cifjhdsfhsd-invalid-cuid'],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[cC][^\\s-]{8,}$'
        }
    });

    addTestCase('cuid2 validation', {
        zodSchema: z.string().cuid2(),
        validInputs: [
            "a",
            "tz4a98xxat96iws9zmbrgj3a",
            "kf5vz6ssxe4zjcb409rjgo747tc5qjazgptvotk6",
        ],
        invalidInputs: [
            "",
            "tz4a98xxat96iws9zMbrgj3a",
            "tz4a98xxat96iws-zmbrgj3a",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[0-9a-z]+$'
        }
    });

    addTestCase('date validation', {
        zodSchema: z.string().date(),
        validInputs: [
            "1970-01-01",
            "2022-01-31",
            "2022-03-31",
            "2022-04-30",
            "2022-05-31",
            "2022-06-30",
            "2022-07-31",
            "2022-08-31",
            "2022-09-30",
            "2022-10-31",
            "2022-11-30",
            "2022-12-31",
            "2000-02-29",
            "2400-02-29",
        ],
        invalidInputs: [
            "2022-02-29",
            "2100-02-29",
            "2200-02-29",
            "2300-02-29",
            "2500-02-29",
            "",
            "foo",
            "200-01-01",
            "20000-01-01",
            "2000-0-01",
            "2000-011-01",
            "2000-01-0",
            "2000-01-011",
            "2000/01/01",
            "01-01-2022",
            "01/01/2022",
            "2000-01-01 00:00:00Z",
            "2020-10-14T17:42:29+00:00",
            "2020-10-14T17:42:29Z",
            "2020-10-14T17:42:29",
            "2020-10-14T17:42:29.123Z",
            "2000-00-12",
            "2000-12-00",
            "2000-01-32",
            "2000-13-01",
            "2000-21-01",
            "2000-02-30",
            "2000-02-31",
            "2000-04-31",
            "2000-06-31",
            "2000-09-31",
            "2000-11-31",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))$'
        }
    });

    addTestCase('datetime validation', {
        zodSchema: z.string().datetime(),
        validInputs: [
            "1970-01-01T00:00:00.000Z",
            "2022-10-13T09:52:31.816Z",
            "2022-10-13T09:52:31.8162314Z",
            "1970-01-01T00:00:00Z",
            "2022-10-13T09:52:31Z",
        ],
        invalidInputs: [
            "",
            "foo",
            "2020-10-14",
            "T18:45:12.123",
            "2020-10-14T17:42:29+00:00",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?(Z)$'
        }
    });

    addTestCase('datetime(precision 0) validation', {
        zodSchema: z.string().datetime({ precision: 0 }),
        validInputs: [
            "1970-01-01T00:00:00Z",
            "2022-10-13T09:52:31Z",
        ],
        invalidInputs: [
            "tuna",
            "1970-01-01T00:00:00.000Z",
            "1970-01-01T00:00:00.Z",
            "2022-10-13T09:52:31.816Z",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(Z)$'
        }
    });

    addTestCase('datetime(precision 3) validation', {
        zodSchema: z.string().datetime({ precision: 3 }),
        validInputs: [
            "1970-01-01T00:00:00.000Z",
            "2022-10-13T09:52:31.123Z",
        ],
        invalidInputs: [
            "tuna",
            "1970-01-01T00:00:00.1Z",
            "1970-01-01T00:00:00.12Z",
            "2022-10-13T09:52:31Z",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{3}(Z)$'
        }
    });

    addTestCase('datetime(offset: true) validation', {
        zodSchema: z.string().datetime({ offset: true }),
        validInputs: [
            "1970-01-01T00:00:00.000Z",
            "2022-10-13T09:52:31.816234134Z",
            "1970-01-01T00:00:00Z",
            "2022-10-13T09:52:31.4Z",
            "2020-10-14T17:42:29+00:00",
            "2020-10-14T17:42:29+03:15",
            "2020-10-14T17:42:29+0315",
        ],
        invalidInputs: [
            "2020-10-14T17:42:29+03",
            "tuna",
            "2022-10-13T09:52:31.Z",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?(Z|([+-]\\d{2}:?\\d{2}))$'
        }
    });

    addTestCase('datetime(offset: true, precision 0) validation', {
        zodSchema: z.string().datetime({ offset: true, precision: 0 }),
        validInputs: [
            "1970-01-01T00:00:00Z",
            "2022-10-13T09:52:31Z",
            "2020-10-14T17:42:29+00:00",
            "2020-10-14T17:42:29+0000",
        ],
        invalidInputs: [
            "2020-10-14T17:42:29+00",
            "tuna",
            "1970-01-01T00:00:00.000Z",
            "1970-01-01T00:00:00.Z",
            "2022-10-13T09:52:31.816Z",
            "2020-10-14T17:42:29.124+00:00",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(Z|([+-]\\d{2}:?\\d{2}))$'
        }
    });

    addTestCase('datetime(offset: true, precision 4) validation', {
        zodSchema: z.string().datetime({ offset: true, precision: 4 }),
        validInputs: [
            "1970-01-01T00:00:00.1234Z",
            "2020-10-14T17:42:29.1234+00:00",
            "2020-10-14T17:42:29.1234+0000",
        ],
        invalidInputs: [
            "2020-10-14T17:42:29.1234+00",
            "tuna",
            "1970-01-01T00:00:00.123Z",
            "2020-10-14T17:42:29.124+00:00",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{4}(Z|([+-]\\d{2}:?\\d{2}))$'
        }
    });

    addTestCase('duration validation', {
        zodSchema: z.string().duration(),
        validInputs: [
            "P3Y6M4DT12H30M5S",
            "P2Y9M3DT12H31M8.001S",
            "+P3Y6M4DT12H30M5S",
            "-PT0.001S",
            "+PT0.001S",
            "PT0,001S",
            "PT12H30M5S",
            "-P2M1D",
            "P-2M-1D",
            "-P5DT10H",
            "P-5DT-10H",
            "P1Y",
            "P2MT30M",
            "PT6H",
            "P5W",
            "P0.5Y",
            "P0,5Y",
            "P42YT7.004M",
        ],
        invalidInputs: [
            "foo bar",
            "",
            " ",
            "P",
            "T1H",
            "P0.5Y1D",
            "P0,5Y6M",
            "P1YT",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[-+]?P(?!$)(?:(?:[-+]?\\d+Y)|(?:[-+]?\\d+[.,]\\d+Y$))?(?:(?:[-+]?\\d+M)|(?:[-+]?\\d+[.,]\\d+M$))?(?:(?:[-+]?\\d+W)|(?:[-+]?\\d+[.,]\\d+W$))?(?:(?:[-+]?\\d+D)|(?:[-+]?\\d+[.,]\\d+D$))?(?:T(?=[\\d+-])(?:(?:[-+]?\\d+H)|(?:[-+]?\\d+[.,]\\d+H$))?(?:(?:[-+]?\\d+M)|(?:[-+]?\\d+[.,]\\d+M$))?(?:[-+]?\\d+(?:[.,]\\d+)?S)?)??$'
        }
    });

    addTestCase('email validation', {
        zodSchema: z.string().email(),
        validInputs: [
            `email@domain.com`,
            `firstname.lastname@domain.com`,
            `email@subdomain.domain.com`,
            `firstname+lastname@domain.com`,
            `1234567890@domain.com`,
            `email@domain-one.com`,
            `_______@domain.com`,
            `email@domain.name`,
            `email@domain.co.jp`,
            `firstname-lastname@domain.com`,
            `very.common@example.com`,
            `disposable.style.email.with+symbol@example.com`,
            `other.email-with-hyphen@example.com`,
            `fully-qualified-domain@example.com`,
            `user.name+tag+sorting@example.com`,
            `x@example.com`,
            `mojojojo@asdf.example.com`,
            `example-indeed@strange-example.com`,
            `example@s.example`,
            `user-@example.org`,
            `user@my-example.com`,
            `a@b.cd`,
            `work+user@mail.com`,
            `tom@test.te-st.com`,
            `something@subdomain.domain-with-hyphens.tld`,
            `common'name@domain.com`,
            `francois@etu.inp-n7.fr`,
        ],
        invalidInputs: [
            `francois@@etu.inp-n7.fr`,
            `"email"@domain.com`,
            `"e asdf sadf ?<>ail"@domain.com`,
            `" "@example.org`,
            `"john..doe"@example.org`,
            `"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com`,
            `a,b@domain.com`,
            `email@123.123.123.123`,
            `email@[123.123.123.123]`,
            `postmaster@123.123.123.123`,
            `user@[68.185.127.196]`,
            `ipv4@[85.129.96.247]`,
            `valid@[79.208.229.53]`,
            `valid@[255.255.255.255]`,
            `valid@[255.0.55.2]`,
            `valid@[255.0.55.2]`,
            `hgrebert0@[IPv6:4dc8:ac7:ce79:8878:1290:6098:5c50:1f25]`,
            `bshapiro4@[IPv6:3669:c709:e981:4884:59a3:75d1:166b:9ae]`,
            `jsmith@[IPv6:2001:db8::1]`,
            `postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]`,
            `postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:192.168.1.1]`,
            `plainaddress`,
            `#@%^%#$@#$@#.com`,
            `@domain.com`,
            `Joe Smith &lt;email@domain.com&gt;`,
            `email.domain.com`,
            `email@domain@domain.com`,
            `.email@domain.com`,
            `email.@domain.com`,
            `email..email@domain.com`,
            `あいうえお@domain.com`,
            `email@domain.com (Joe Smith)`,
            `email@domain`,
            `email@-domain.com`,
            `email@111.222.333.44444`,
            `email@domain..com`,
            `Abc.example.com`,
            `A@b@c@example.com`,
            `colin..hacks@domain.com`,
            `a"b(c)d,e:f;g<h>i[j\k]l@example.com`,
            `just"not"right@example.com`,
            `this is"not\allowed@example.com`,
            `this\ still\"not\\allowed@example.com`,
            `i_like_underscore@but_its_not_allowed_in_this_part.example.com`,
            `QA[icon]CHOCOLATE[icon]@test.com`,
            `invalid@-start.com`,
            `invalid@end.com-`,
            `a.b@c.d`,
            `invalid@[1.1.1.-1]`,
            `invalid@[68.185.127.196.55]`,
            `temp@[192.168.1]`,
            `temp@[9.18.122.]`,
            `double..point@test.com`,
            `asdad@test..com`,
            `asdad@hghg...sd...au`,
            `asdad@hghg........au`,
            `invalid@[256.2.2.48]`,
            `invalid@[256.2.2.48]`,
            `invalid@[999.465.265.1]`,
            `jkibbey4@[IPv6:82c4:19a8::70a9:2aac:557::ea69:d985:28d]`,
            `mlivesay3@[9952:143f:b4df:2179:49a1:5e82:b92e:6b6]`,
            `gbacher0@[IPv6:bc37:4d3f:5048:2e26:37cc:248e:df8e:2f7f:af]`,
            `invalid@[IPv6:5348:4ed3:5d38:67fb:e9b:acd2:c13:192.168.256.1]`,
            `test@.com`,
            `aaaaaaaaaaaaaaalongemailthatcausesregexDoSvulnerability@test.c`,
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(?!\\.)(?!.*\\.\\.)([a-zA-Z0-9_\'+\\-\\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\\-]*\\.)+[a-zA-Z]{2,}$'
        }
    });

    addTestCase('emoji validation', {
        zodSchema: z.string().emoji(),
        validInputs: [
            "👋👋👋👋",
            "🍺👩‍🚀🫡",
            "💚💙💜💛❤️",
            "🐛🗝🐏🍡🎦🚢🏨💫🎌☘🗡😹🔒🎬➡️🍹🗂🚨⚜🕑〽️🚦🌊🍴💍🍌💰😳🌺🍃",
            "🇹🇷🤽🏿‍♂️",
        ],
        invalidInputs: [
            ":-)",
            "😀 is an emoji",
            "😀stuff",
            "stuff😀",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$'
        }
    });

    addTestCase('endsWith validation', {
        zodSchema: z.string().endsWith('ends.with'),
        validInputs: ['it does ends.with'],
        invalidInputs: ['it does not ends.with it'],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '\\x65nds\\.with$'
        }
    });

    addTestCase('includes validation', {
        zodSchema: z.string().includes('includes.this'),
        validInputs: ['it does includes.this', 'includes.this it does', 'but does includes.this includes this?'],
        invalidInputs: ['it does not includes. with'],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^.{0}.*\\x69ncludes\\.this'
        }
    });

    addTestCase('ip validation', {
        zodSchema: z.string().ip(),
        validInputs: [
            "1e5e:e6c8:daac:514b:114b:e360:d8c0:682c",
            "9d4:c956:420f:5788:4339:9b3b:2418:75c3",
            "474f:4c83::4e40:a47:ff95:0cda",
            "d329:0:25b4:db47:a9d1:0:4926:0000",
            "e48:10fb:1499:3e28:e4b6:dea5:4692:912c",
            "114.71.82.94",
            "0.0.0.0",
            "37.85.236.115",
            "2001:4888:50:ff00:500:d::",
            "2001:4888:50:ff00:0500:000d:000:0000",
            "2001:4888:50:ff00:0500:000d:0000:0000",
        ],
        invalidInputs: [
            "d329:1be4:25b4:db47:a9d1:dc71:4926:992c:14af",
            "d5e7:7214:2b78::3906:85e6:53cc:709:32ba",
            "8f69::c757:395e:976e::3441",
            "54cb::473f:d516:0.255.256.22",
            "54cb::473f:d516:192.168.1",
            "256.0.4.4",
            "-1.0.555.4",
            "0.0.0.0.0",
            "1.1.1",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$'
        }
    });

    addTestCase('ipv4 validation', {
        zodSchema: z.string().ip({ version: 'v4' }),
        validInputs: [
            "114.71.82.94",
            "0.0.0.0",
            "37.85.236.115",
        ],
        invalidInputs: [
            "1e5e:e6c8:daac:514b:114b:e360:d8c0:682c",
            "9d4:c956:420f:5788:4339:9b3b:2418:75c3",
            "474f:4c83::4e40:a47:ff95:0cda",
            "d329:0:25b4:db47:a9d1:0:4926:0000",
            "e48:10fb:1499:3e28:e4b6:dea5:4692:912c",
            "2001:4888:50:ff00:500:d::",
            "2001:4888:50:ff00:0500:000d:000:0000",
            "2001:4888:50:ff00:0500:000d:0000:0000",

            "d329:1be4:25b4:db47:a9d1:dc71:4926:992c:14af",
            "d5e7:7214:2b78::3906:85e6:53cc:709:32ba",
            "8f69::c757:395e:976e::3441",
            "54cb::473f:d516:0.255.256.22",
            "54cb::473f:d516:192.168.1",
            "256.0.4.4",
            "-1.0.555.4",
            "0.0.0.0.0",
            "1.1.1",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$'
        }
    });

    addTestCase('ipv6 validation', {
        zodSchema: z.string().ip({ version: 'v6' }),
        validInputs: [
            "1e5e:e6c8:daac:514b:114b:e360:d8c0:682c",
            "9d4:c956:420f:5788:4339:9b3b:2418:75c3",
            "474f:4c83::4e40:a47:ff95:0cda",
            "d329:0:25b4:db47:a9d1:0:4926:0000",
            "e48:10fb:1499:3e28:e4b6:dea5:4692:912c",
            "2001:4888:50:ff00:500:d::",
            "2001:4888:50:ff00:0500:000d:000:0000",
            "2001:4888:50:ff00:0500:000d:0000:0000",
        ],
        invalidInputs: [
            "114.71.82.94",
            "0.0.0.0",
            "37.85.236.115",
            "d329:1be4:25b4:db47:a9d1:dc71:4926:992c:14af",
            "d5e7:7214:2b78::3906:85e6:53cc:709:32ba",
            "8f69::c757:395e:976e::3441",
            "54cb::473f:d516:0.255.256.22",
            "54cb::473f:d516:192.168.1",
            "256.0.4.4",
            "-1.0.555.4",
            "0.0.0.0.0",
            "1.1.1",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$'
        }
    });

    addTestCase('length validation', {
        zodSchema: z.string().length(5),
        validInputs: ['valid', '12345'],
        invalidInputs: ['invalid', 'inv'],
        expectedValidatorSchema: {
            bsonType: 'string',
            minLength: 5,
            maxLength: 5
        }
    });

    addTestCase('min validation', {
        zodSchema: z.string().min(5),
        validInputs: ['valid', 'valid!'],
        invalidInputs: ['vali'],
        expectedValidatorSchema: {
            bsonType: 'string',
            minLength: 5,
        }
    });

    addTestCase('max validation', {
        zodSchema: z.string().max(5),
        validInputs: ['valid', 'val'],
        invalidInputs: ['invalid'],
        expectedValidatorSchema: {
            bsonType: 'string',
            maxLength: 5
        }
    });

    addTestCase('min and max validation', {
        zodSchema: z.string().min(3).max(6),
        validInputs: ['val', 'valid', 'valid!'],
        invalidInputs: ['va', 'valid!?'],
        expectedValidatorSchema: {
            bsonType: 'string',
            minLength: 3,
            maxLength: 6
        }
    });

    addTestCase('nanoid validation', {
        zodSchema: z.string().nanoid(),
        validInputs: [
            "lfNZluvAxMkf7Q8C5H-QS",
            "mIU_4PJWikaU8fMbmkouz",
            "Hb9ZUtUa2JDm_dD-47EGv",
            "5Noocgv_8vQ9oPijj4ioQ",
        ],
        invalidInputs: [
            "Xq90uDyhddC53KsoASYJGX",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[a-zA-Z0-9_-]{21}$'
        }
    });

    addTestCase('regex validation', {
        zodSchema: z.string().regex(/^moo+$/),
        validInputs: ['moo', 'mooooooooo'],
        invalidInputs: ['mo', 'boooooo'],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^moo+$',
        }
    })

    addTestCase('startsWith validation', {
        zodSchema: z.string().startsWith('starts.with'),
        validInputs: ['starts.with the right stuff'],
        invalidInputs: ['would be fine if it starts.with it'],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^\\x73tarts\\.with'
        }
    });

    addTestCase('time validation', {
        zodSchema: z.string().time(),
        validInputs: [
            "00:00:00",
            "23:00:00",
            "00:59:00",
            "00:00:59",
            "23:59:59",
            "09:52:31",
            "23:59:59.9999999",
        ],
        invalidInputs: [
            "",
            "foo",
            "00:00:00Z",
            "0:00:00",
            "00:0:00",
            "00:00:0",
            "00:00:00.000+00:00",
            "24:00:00",
            "00:60:00",
            "00:00:60",
            "24:60:60",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?$'
        }
    });

    addTestCase('time(precision 2) validation', {
        zodSchema: z.string().time({precision: 2}),
        validInputs: [
            "00:00:00.00",
            "09:52:31.12",
            "23:59:59.99",
        ],
        invalidInputs: [
            "",
            "foo",
            "00:00:00",
            "00:00:00.00Z",
            "00:00:00.0",
            "00:00:00.000",
            "00:00:00.00+00:00",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{2}$'
        }
    });

    addTestCase('ulid validation', {
        zodSchema: z.string().ulid(),
        validInputs: [
            "01ARZ3NDEKTSV4RRFFQ69G5FAV",
            "01arZ3nDeKTsV4RRffQ69G5FAV"
        ],
        invalidInputs: [
            "01ARZ3NDEKTSV4RRFFQ69G5FAVA"
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[0-9a-hA-HjJkKmMnNp-tP-Tv-zV-Z]{26}$'
        }
    });

    addTestCase('url validation', {
        zodSchema: z.string().url(),
        validInputs: [
            "http://example.com",
            "https://example.com",
            "ftp://example.com",
            "custom-protocol://example.com",
            "http://example.com/path/to/resource",
            "https://example.com?query=param",
            "http://example.com#fragment",
            "custom-protocol://example.com:8080/path",
            "random-protocol://some-host/path",
            "http://127.0.0.1",
            "http://localhost",
            "http://example.com:3000",
            "http://example.com/path/to/resource?query=param#fragment",
        ],
        invalidInputs: [
            "example.com",
            "://example.com ",
            "http//example.com",
            "http:/example.com",
            "http://",
            "http:// example.com",
            "http://example .com",
            "http://example.com/ path",
            "http://.example.com",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[a-zA-Z][a-zA-Z\\d+\\-.]*:\\/\\/[^\\s\\/$.?#].[^\\s]*$'
        }
    })

    addTestCase('uuid validation', {
        zodSchema: z.string().uuid(),
        validInputs: [
            "9491d710-3185-4e06-bea0-6a2f275345e0",
            "d89e7b01-7598-ed11-9d7a-0022489382fd",
            "00000000-0000-0000-0000-000000000000",
            "b3ce60f8-e8b9-40f5-1150-172ede56ff74",
            "92e76bf9-28b3-4730-cd7f-cb6bc51f8c09",
        ],
        invalidInputs: [
            "9491d710-3185-4e06-bea0-6a2f275345e0X",
        ],
        expectedValidatorSchema: {
            bsonType: 'string',
            pattern: '^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$'
        }
    });
})