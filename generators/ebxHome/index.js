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
            this.license = this.options.license;
        }
    },

    writing: {
        writeAssets: function writeAssets() {
            this.directory(
                this.templatePath('assets/EBX-Home/'),
                path.join(this.workspacePath, 'EBX-Home/')
            );
        },

        writeTemplates: function writeTemplates() {
            this.fs.copyTpl(
                this.templatePath('templates/EBX-Home/_ebx.properties'),
                path.join(this.workspacePath, 'EBX-Home/ebx.properties'), {
                    license: this.license
                }
            );
        }
    }

});
