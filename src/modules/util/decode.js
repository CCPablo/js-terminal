export { decodeInstruction, decodeMark }

function decodeInstruction(rawInput) {
    let splitted = split(rawInput);
    const decoded = {command: splitted.shift(), parameters: [], argumentList: []}
    splitted.forEach(element => {
        if (element.startsWith('-')) {
            decoded.parameters.push(element);
        } else {
            decoded.argumentList.push(element);
        }
    })
    return decoded;

    function split(string) {
        const quoted = extractQuotedText(string);
        return  quoted.filteredString.split(' ')
            .filter(string => string !== "")
            .concat(quoted.quotedSections)
            .map(string => string.trim());

        function extractQuotedText(string) {
            const quotesRegex = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/
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
            } while(match);
            return {
                filteredString: filteredString,
                quotedSections: quotedSections
            };
        }
    }
}

function decodeMark(array) {
    const mark = array.find(item => /^[!@#><\$%\^\&(+=._]+$/.test(item));
    return mark ? {
        source: getAllBeforeMark(array,  mark),
        target: getAllAfterMark(array, mark),
        mark: removeMark(array, mark)
    } : false;

    function getAllBeforeMark(array, mark) {
        var i = array.indexOf(mark);
        return array.slice(0, i);
    }
    
    function getAllAfterMark(array, mark) {
        var i = array.indexOf(mark);
        return array.slice(i+1, array.length);
    }
    
    function removeMark(array, mark) {
        var i = array.indexOf(mark);
        return array.splice(i, 1)[0];
    }
}

