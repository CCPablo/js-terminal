export { Path }

class Path {
    constructor(path = []) {
        this.path = path;
        this.pointer = {
            level: 0,
            foldersDown: [],
            source: ''
        };
    }

    getAbsolutRawPath() {
        return `/${this.path.join('/')}`;
    }

    getParentPath = function() {
        return this.path
            .slice(0, this.pointer.level)
            .concat(this.pointer.foldersDown);
    }

    getSourcePath = function() {
        return this.pointer.source ? this.getParentPath().concat(this.pointer.source) : this.getParentPath();
    }

    pushpath = function(path) {
        this.path = this.path.concat(path);
    }

    poppath = function(levels = 1) {
        this.path.splice(-levels, levels);
    }

    setSourceToAbsolut = function() {
        this.path = this.getSourcePath();
    }

    setRelativePath = function(rawRelative) {
        if(!rawRelative) {
            this.pointer.level = this.path.length;
            this.pointer.foldersDown = [];
            this.pointer.source = '';
            return;
        }
        let allMembers = rawRelative.split('/');
        if(allMembers[0] === '') {
            allMembers.shift();
            this.pointer.level = 0;
            this.pointer.source = allMembers.pop();
            this.pointer.foldersDown = allMembers;
        } else {
            this.pointer.level = this.path.length;
            allMembers = allMembers.filter(folder => {
                if(folder === ".") {
                    return false;
                }
                else if(folder === "..") {
                    this.pointer.level--;
                    return false;
                }
                return folder !== "";
            })
            this.pointer.source = allMembers.pop();
            this.pointer.foldersDown = allMembers;
        }
    }
}