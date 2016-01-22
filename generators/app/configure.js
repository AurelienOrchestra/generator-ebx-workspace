'use strict';
var chalk = require('chalk');
var path = require('path');

module.exports = {

    separator: function separator() {
        this.log();
        this.log(chalk.green('Your workspace is being configured ...'));
        this.log();
    },

    configurePaths: function configurePaths() {
        if (this.inputs.workspaceDir) {
            this.workspacePath = this.inputs.workspaceDir;
        } else {
            this.workspacePath = this.destinationPath(path.join(this.inputs.prospect,
                this.inputs.context));
        }
        this.modulePath = path.join(this.workspacePath, this.inputs.moduleName);
    }

};
