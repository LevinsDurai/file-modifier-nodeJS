/* $Id$*/
ZohoDeskEditor.ze_Undo = {
    // ze_Undo=ze_Undo={};
    commands: [],
    stackPosition: -1,
    lastSavedState: "",

    execute: function(command) {
        if (this.lastSavedState == command.newValue) {
            return; // same state so do nothing
        } else {
            this.lastSavedState = command.newValue; // update last saved state
        }
        this.clearRedo(); // clear Redo since new state is going to be storeds
        if (this.stackPosition + 1 > 100) { // if stack exceeds 100
            this.commands.splice(0, 1);
            this.stackPosition -= 1;
        }
        this.commands.push(command);
        this.stackPosition++;
    },

    clearStack: function() { // clearing the state
        this.stackPosition = -1;
        this.commands.splice(0, this.commands.length);
        this.lastSavedState = "";
    },

    undo: function() {
        if (this.stackPosition > 0) {
            this.stackPosition--;
            this.commands[this.stackPosition].undo();
            this.commands[this.stackPosition].setFocus();
            this.lastSavedState = this.commands[this.stackPosition].newValue;
        }
    },
    canUndo: function() {
        return this.stackPosition > 0;
    },
    redo: function() {
        this.stackPosition++;
        this.commands[this.stackPosition].redo();
        this.lastSavedState = this.commands[this.stackPosition].newValue;
        this.commands[this.stackPosition].setFocus();
    },
    canRedo: function() {
        return this.stackPosition < this.commands.length - 1;
    },
    clearRedo: function() {
        // TODO there's probably a more efficient way for this
        this.commands = this.commands.slice(0, this.stackPosition + 1);
    }
};




























































