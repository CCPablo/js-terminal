export {File}

class File {
    constructor(content = '') {
        this.content = content;
    }

    getContent = function () {
        return this.content;
    }

    setContent = function (content) {
        this.content = content;
    }

    appendContent = function (content) {
        this.content += content;
    }

    getSize = function () {
        return this.content.length;
    }

    eval = function () {
        return eval(this.content);
    }
}

