const DecimalDigit = '0123456789';
const AsciiLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SyntaxCharacter = '^$\\.*+?()[]{}|'
const ControlCharacterReplacements: Record<string, string> = {
    '\t': '\\t',
    '\n': '\\n',
    '\v': '\\v',
    '\f': '\\f',
    '\r': '\\r',
}

const escapeChar = (char: string): string => {
    return `\\x${char.charCodeAt(0).toString(16).padStart(2, '0')}`;
}

export const escapeRegex = (string: string): string => {
    if(!string) { return string; }
    let escaped = '';
    for (const char of string) {
        if(escaped === '' && (DecimalDigit.includes(char) || AsciiLetter.includes(char))) {
            escaped += escapeChar(char);
            continue;
        }
        if(SyntaxCharacter.includes(char)) {
            escaped += `\\${char}`;
            continue;
        }
        if(ControlCharacterReplacements[char]) {
            escaped += ControlCharacterReplacements[char];
            continue;
        }
        escaped += char;
    }
    return escaped;
}