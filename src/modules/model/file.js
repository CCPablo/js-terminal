export { File }

class File {
    constructor(name, content = '') {
        this.name = name;
        this.content = content;
    }

    getName = function() {
        return this.name;
    }

    setName = function(name) {
        this.name = name;
    }

    eval = function() {
        return eval(this.content);
    }
}