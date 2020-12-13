
export class Command {
    constructor(description, manRef, run) {
        this.description = description;
        this.manRef = manRef;
        this.run = run;
    }
}