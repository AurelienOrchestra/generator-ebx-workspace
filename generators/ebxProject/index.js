'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

    initializing: {

        welcome: function welcome() {
            this.log(chalk.green('Generating EBX-Project ...'));
        },

        initializeOptions: function initializeOptions() {
            this.modulePath = this.options.modulePath;
            this.moduleName = this.options.moduleName;
        }
    },

    writing: {
        writeAssets: function writeAssets() {
            this.directory(
                this.templatePath('assets/EBX-Project/'),
                path.join(this.modulePath, '/')
            );
        },

        writeTemplates: function writeTemplates() {
            this.fs.copyTpl(
                this.templatePath('templates/EBX-Project/_project'),
                path.join(this.modulePath, '.project'), {
                    moduleName: this.moduleName
                }
            );
            this.fs.copyTpl(
                this.templatePath('templates/EBX-Project/webapp/WEB-INF/_web.xml'),
                path.join(this.modulePath, 'webapp/WEB-INF/web.xml'), {
                    moduleName: this.moduleName
                }
            );
            this.fs.copyTpl(
                this.templatePath(
                    'templates/EBX-Project/webapp/WEB-INF/ebx/_module.xml'),
                path.join(this.modulePath, 'webapp/WEB-INF/ebx/module.xml'), {
                    moduleName: this.moduleName
                }
            );
        }
    }

});
