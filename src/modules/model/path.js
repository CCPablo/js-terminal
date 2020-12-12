export { Path }

class Path {
    constructor(path = []) {
        this.path = path;
    }

    getPath = function(levelsUp = 0) {
        return this.path.slice(0, this.path.length-levelsUp);
    }

    getParentPath = function() {
        return getPath(1);
    }

    getRawPath() {
        return `/${this.path.join('/')}`;
    }

    getSource = function() {
        return this.path[this.path.length-1];
    }

    setPath = function(path) {
        this.path = path;
    }

    pushPath = function(path) {
        this.path = this.path.concat(path);
    }

    popPath = function(levels = 1) {
        this.path.splice(-levels, levels);
    }

    newPath(level, foldersDown) {
        return new Path(this.path.slice(0, level).concat(foldersDown));
    }

    appendRelative = function(rawRelative, withEmptySource = false) {
        if(!rawRelative || rawRelative.length === 0) {
            return this.newPath(this.path.length, []);
        }
        let items = rawRelative.split('/');
        if(items[0] === '') {
            items = items.filter(folder => folder !== "" || withEmptySource);
            return this.newPath(0, items);
        } else {
            let level = this.path.length;
            items = items.filter(folder => {
                if(folder === ".") {
                    return false;
                }
                else if(folder === "..") {
                    level--;
                    return false;
                }
                return folder !== "" || withEmptySource;
            })
            return this.newPath(level, items);
        }
    }
}