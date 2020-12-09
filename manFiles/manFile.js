class manFile {
    constructor( name, sinopsis, description, examples, author ){
        this.manName = name;
        this.manSinopsis = sinopsis;
        this.manDescription = description;
        this.manExamples = examples;
        this.manAuthor = author;
    }


    get Name () {
        let stringToHTML = function (str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }
        return stringToHTML(this.name);
        
    };
    get Sinopsis () {
        let stringToHTML = function (str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }
        
        return stringToHTML(this.sinopsis);

    };
    get Description () {
        let stringToHTML = function (str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }

        return stringToHTML(this.description);

    };
    get Examples () {
        let stringToHTML = function (str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }
        return stringToHTML(this.examples);

    };
    get Author () {   
        let stringToHTML = function (str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }         
        return stringToHTML(this.author);
    };
    
    get All () {
        let stringToHTML = function (str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }
        return stringToHTML(this.name) + stringToHTML(this.sinopsis) + stringToHTML(this.description) + stringToHTML(this.examples) + stringToHTML(this.author);
       
    };

}


module.exports = { stringToHTML, manFile };