export {File}

class File {
    constructor(name, content = '') {
        this.name = name;
        this.content = content;
    }

    getName = function () {
        return this.name;
    }

    setName = function (name) {
        this.name = name;
    }

    getContent = function () {
        return this.content;
    }

    setContent = function () {
        this.content = content;
    }

    eval = function () {
        return eval(this.content);
    }
}

