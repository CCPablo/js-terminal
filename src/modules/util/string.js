export { splitWhiteSpaces }

const quotesRegex = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/

function splitWhiteSpaces(string) {
    const quoted = extractQuotedText(string);
    return  quoted.filteredString.split(' ')
        .filter(string => string !== "")
        .concat(quoted.quotedSections);
}

function extractQuotedText(string) {
    const quotedSections = [];
    let result = null;
    let filteredString = string;
    do {
        result = quotesRegex.exec(filteredString);
        console.log(result);
        if(result !== null) {
            quotedSections.push(result[2]);
            filteredString = filteredString.replace(result[0], "")
        }
    } while(result !== null)
    return {
        filteredString: filteredString,
        quotedSections: quotedSections
    };
}