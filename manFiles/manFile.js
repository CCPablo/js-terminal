class manFiles {
    constructor( name, sinopsis, description, examples, author ){
        this.name = name;
        this.sinopsis = sinopsis;
        this.description = description;
        this.examples = examples;
        this.author = author;
    }
}

module.exports = { manFiles };

/* 
class manFile {
    constructor( title, description, allowedParameters ) {
        this.title= title;
        this.description= description;
        this.allowedParameters = allowedParameters ;
    }

    getHTML = function() {
        return this.getHTMLTitle() + this.getDescription() + this.getAllowedParameters();
    }
    getHTMLTitle = function() {
        return `<h2>${Name}</h2>`
    }
    getHTMLBriefDescription = function() {
        return `<p>${briefDescription}</p>`
    }
    
    getAllowedParameters = function() {
        return this.allowedParameters.reduce((accumulated, allowedParameter) => {
            return `${accumulated)\n<b>${allowedParameter.name)</b> <span> ${allowedParameter.description)`
        ));
    }

}

*/