export {File}

class File {
    constructor(content = '', timestamp = Date.now(), lastModified = Date.now()) {
        this.content = content;
        this.timestamp = timestamp
        this.lastModified = lastModified;
    }

    getContent = function () {
        return this.content;
    }

    setContent = function (content) {
        return this.content = content;
    }

    appendContent = function (content) {
        return this.content += content;
    }

    getSize = function () {
        return this.content.length;
    }

    eval = function () {
        return eval(this.content);
    }
}

