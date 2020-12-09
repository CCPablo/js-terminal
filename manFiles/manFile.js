class manFile {
    constructor( name, sinopsis, description, examples, author ){
<<<<<<< HEAD
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
=======
        this.name = name;
        this.sinopsis = sinopsis;
        this.description = description;
        this.examples = examples;
        this.author = author;
    }

    stringToHTML = function(str) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(str, 'text/html');
            let InnerHtmlToAdd = doc.getElementsByClassName('h2Item')[0].innerHTML;
            //console.log(InnerHtmlToAdd);
            return InnerHtmlToAdd;
        }

    get Name () {
        return this.stringToHTML(this.name);
            };

    get Sinopsis () {
        return this.stringToHTML(this.sinopsis);
            };

    get Description () {
        return this.stringToHTML(this.description);

    };
    get Examples () {            
        return this.stringToHTML(this.examples);

    };
    get Author () {            
        return this.stringToHTML(this.author);
    };
    
    get All () {
        return this.stringToHTML(this.name) + this.stringToHTML(this.sinopsis) + this.stringToHTML(this.description) + this.stringToHTML(this.examples) + this.stringToHTML(this.author);
>>>>>>> d0927dc1e41a5298dc100a1e8a7dac6c41c0eeb6
       
    };

}


module.exports = { stringToHTML, manFile };