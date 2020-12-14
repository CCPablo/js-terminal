export class manFile {
    constructor(name, sinopsis, description, examples, author) {
        this.name = name;
        this.sinopsis = sinopsis;
        this.description = description;
        this.examples = examples;
        this.author = author;
    }

    stringToHTML = function (str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
        return InnerHtmlToAdd;
    }

    get Name() {
        return this.stringToHTML(this.name);
    };

    get Sinopsis() {
        return this.stringToHTML(this.sinopsis);
    };

    get Description() {
        return this.stringToHTML(this.description);

    };
    get Examples() {
        return this.stringToHTML(this.examples);

    };
    get Author() {
        return this.stringToHTML(this.author);
    };

    get All() {
        return this.stringToHTML(this.name) + this.stringToHTML(this.sinopsis) + this.stringToHTML(this.description) + this.stringToHTML(this.examples) + this.stringToHTML(this.author);
    };

}
