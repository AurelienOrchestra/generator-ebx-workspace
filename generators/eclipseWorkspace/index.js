'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

    initializing: {

        welcome: function welcome() {
            this.log(chalk.green('Generating Eclipse workspace metadata ...'));
        },

        initializeOptions: function initializeOptions() {
            this.workspacePath = this.options.workspacePath;
            this.moduleName = this.options.moduleName;
        }
    },

    writing: {
        writeAssets: function writeAssets() {
            this.directory(
                this.templatePath('assets/.metadata/'),
                path.join(this.workspacePath, '.metadata/')
            );
            this.directory(
                this.templatePath('assets/RemoteSystemsTempFiles/'),
                path.join(this.workspacePath,
                    'RemoteSystemsTempFiles/')
            );
        },

        writeTemplates: function writeTemplates() {

        }
    }

});
