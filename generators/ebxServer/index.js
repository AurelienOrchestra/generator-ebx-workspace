'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

    initializing: {

        welcome: function welcome() {
            this.log(chalk.green('Generating EBX-Server ...'));
        },

        initializeOptions: function initializeOptions() {
            this.userConfig = this.options.userConfig;
            this.workspacePath = this.options.workspacePath;
            this.moduleName = this.options.moduleName;
            this.EBXcoreVersion = this.options.EBXcoreVersion;
            this.EBXaddonsVersion = this.options.EBXaddonsVersion;
            this.hasAddon = this.options.hasAddon;
            this.EBXaddons = this.options.EBXaddons;
            this.presalesToolbox = this.options.presalesToolbox;
        }
    },

    writing: {

        writeAssets: function writeAssets() {
            this.directory(
                this.templatePath('assets/EBX-Server/'),
                path.join(this.workspacePath, 'EBX-Server/')
            );
        },

        writeTemplates: function writeTemplates() {
            this.fs.copyTpl(
                this.templatePath('templates/EBX-Server/_classpath'),
                path.join(this.workspacePath,
                    'EBX-Server/.classpath'), {
                    hasAddon: this.hasAddon,
                    presalesToolbox: this.presalesToolbox
                }
            );
            this.fs.copyTpl(
                this.templatePath('templates/EBX-Server/conf/_server.xml'),
                path.join(this.workspacePath,
                    'EBX-Server/conf/server.xml'), {
                    moduleName: this.moduleName,
                    hasAddon: this.hasAddon,
                    addons: this.EBXaddons,
                    presalesToolbox: this.presalesToolbox
                }
            );
            this.fs.copyTpl(
                this.templatePath(
                    'templates/EBX-Server/ant/launches/_Start_EBX.launch'),
                path.join(this.workspacePath,
                    'EBX-Server/ant/launches/Start EBX.launch'), {
                    moduleName: this.moduleName
                }
            );
        }

    }

});
