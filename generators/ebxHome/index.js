'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

    initializing: {

        welcome: function welcome() {
            this.log(chalk.green('Generating EBX-Home ...'));
        },

        initializeOptions: function initializeOptions() {
            this.workspacePath = this.options.workspacePath;
        }
    },

    writing: {
        writeAssets: function writeAssets() {
            this.directory(
                this.templatePath('assets/EBX-Home/'),
                path.join(this.workspacePath, 'EBX-Home/')
            );
        }
    }

});
