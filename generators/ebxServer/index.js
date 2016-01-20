'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');

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
        },

        configureBinDir: function configureBinDir() {
            this.libDir = path.join(this.workspacePath, 'EBX-Server/lib');
            this.webappDir = path.join(this.workspacePath, 'EBX-Server/webapps');
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

    },

    install: {

        copyEBXcoreFiles: function copyEBXcoreFiles() {
            var binDir = path.join(this.userConfig.EBXcoreBinDir, this.EBXcoreVersion);
            var warDir = path.join(binDir, './ebx.software/webapps/wars-packaging');
            var jarDir = path.join(binDir, './ebx.software/lib');

            if (this.fs.exists(jarDir + '/ebx.jar')) {
                this.fs.copy(jarDir + '/ebx.jar', this.libDir + '/ebx.jar');
            } else {
                this.log(chalk.yellow('ebx.jar not found'));
            }

            if (this.fs.exists(warDir + '/ebx.war')) {
                this.fs.copy(warDir, this.webappDir);
            } else {
                this.log(chalk.yellow('EBX core wars not found'));
            }
        },

        copyEBXaddonFiles: function copyEBXaddonFiles() {
            if (this.hasAddon) {
                var binDir = path.join(this.userConfig.EBXaddonBinDir, this.EBXaddonsVersion);
                var warDir = path.join(binDir, './wars');
                var jarDir = path.join(binDir, './lib');

                if (this.fs.exists(jarDir + '/ebx-addons.jar')) {
                    this.fs.copy(jarDir, this.libDir);
                } else {
                    this.log(chalk.yellow('ebx-addons.jar not found'));
                }

                if (this.fs.exists(warDir + '/ebx-addon-common.war')) {
                    if (this.EBXaddons.length > 0) {
                        this.fs.copy(warDir + '/ebx-addon-common.war', this.webappDir +
                            '/ebx-addon-common.war');
                        _.forEach(this.EBXaddons, function(addon) {
                            this.fs.copy(warDir + '/' + addon.file, this.webappDir +
                                '/' + addon.file);
                        }, this);
                    }
                } else {
                    this.log(chalk.yellow('EBX Addons wars not found'));
                }
            }

        },

        copyPresalesToolbox: function copyPresalesToolbox() {
            if (this.presalesToolbox) {
                if (this.userConfig.PresalesToolboxBinDir) {
                    var binDir = path.join(this.userConfig.PresalesToolboxBinDir);

                    if (this.fs.exists(binDir + '/presales-toolbox.jar')) {
                        this.fs.copy(binDir + '/presales-toolbox.jar', this.libDir +
                            '/presales-toolbox.jar');
                    } else {
                        this.log(chalk.yellow('presales-toolbox.jar not found'));
                    }

                    if (this.fs.exists(binDir + '/presales-toolbox-javadoc.zip')) {
                        this.fs.copy(binDir + '/presales-toolbox-javadoc.zip', this.libDir +
                            '/presales-toolbox-javadoc.zip');
                    } else {
                        this.log(chalk.yellow('presales-toolbox-javadoc.zip not found'));
                    }

                    if (this.fs.exists(binDir + '/presales-toolbox.war')) {
                        this.fs.copy(binDir + '/presales-toolbox.war', this.webappDir +
                            '/presales-toolbox.war');
                    } else {
                        this.log(chalk.yellow('presales-toolbox.war not found'));
                    }
                }
            }
        }

    }

});
