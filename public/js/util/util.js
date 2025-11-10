/*
sanitizeString replaces unwanted characters in string with the allowed character '-'
*/

export function sanitizeString(string) {
    return string.replaceAll(' ', '-');
}