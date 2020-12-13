export { decode }

const quotesRegex = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/

function decode(rawInput) {
    let splitted = splitWhiteSpaces(rawInput);
    const decoded = {command: splitted.shift(), parameters: [], argumentList: []}

    splitted.forEach(element => {
        if (element.startsWith('-')) {
            decoded.parameters.push(element);
        } else {
            decoded.argumentList.push(element);
        }
    })

    return decoded;
}

function splitWhiteSpaces(string) {
    const quoted = extractQuotedText(string);
    return  quoted.filteredString.split(' ')
        .filter(string => string !== "")
        .concat(quoted.quotedSections)
        .map(string => string.trim());
}

function extractQuotedText(string) {
    const quotedSections = [];
    let match = false;
    let filteredString = string;
    do {
        match = quotesRegex.test(filteredString);
        if(match) {
            let result = quotesRegex.exec(filteredString);
            quotedSections.push(result[2]);
            filteredString = filteredString.replace(result[0], "")
        }
    } while(match)
    return {
        filteredString: filteredString,
        quotedSections: quotedSections
    };
}