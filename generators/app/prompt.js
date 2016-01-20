'use strict';
var path = require('path');
var _ = require('lodash');

module.exports = {

    askProspect: function askProspect() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'prospect',
            message: 'Who is the prospect?',
            store: false
        }, function(answers) {
            this.inputs.prospect = answers.prospect;
            done();
        }.bind(this));
    },

    askContext: function askContext() {
        var done = this.async();
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var defaultContext = 'POC' + '_' + year + '_' + month;
        this.prompt({
            type: 'input',
            name: 'context',
            message: 'What is the context?',
            default: defaultContext,
            store: false
        }, function(answers) {
            this.inputs.context = answers.context;
            done();
        }.bind(this));
    },

    askEBXModuleName: function askEBXModuleName() {
        var done = this.async();
        this.inputs.moduleName = 'EBX-Project';
        done();
        /**
        this.prompt({
            type: 'input',
            name: 'moduleName',
            message: 'How would you call the EBX module?',
            default: 'EBX-Project',
            store: false
        }, function(answers) {
            this.inputs.moduleName = answers.moduleName;
            done();
        }.bind(this));
        */
    },

    chooseEBXCoreVersion: function chooseEBXCoreVersion() {
        if (this.EBXcoreVersions && this.EBXcoreVersions.length > 0) {
            var done = this.async();
            var choices = this.EBXcoreVersions;
            this.prompt({
                type: 'list',
                name: 'EBXcoreVersion',
                message: 'Which EBX core version would you use?',
                choices: choices,
                store: true
            }, function(answers) {
                this.inputs.EBXcoreVersion = answers.EBXcoreVersion;
                done();
            }.bind(this));
        }
    },

    chooseEBXAddonsVersion: function chooseEBXAddonsVersion() {
        if (this.EBXaddonsVersions && this.EBXaddonsVersions.length > 0) {
            var done = this.async();
            var choices = this.EBXaddonsVersions;
            choices.push('none');
            this.prompt({
                type: 'list',
                name: 'EBXaddonsVersion',
                message: 'Which EBX addons version would you use?',
                choices: choices,
                store: true
            }, function(answers) {
                this.inputs.EBXaddonsVersion = answers.EBXaddonsVersion;
                if (this.inputs.EBXaddonsVersion && this.inputs.EBXaddonsVersion !==
                    'none') {
                    this.hasAddon = true;
                } else {
                    this.hasAddon = false;
                }
                done();
            }.bind(this));
        }
    },

    chooseEBXAddons: function chooseEBXAddons() {
        this.inputs.EBXaddons = [];
        if (this.hasAddon) {
            var done = this.async();
            var choices = this.EBXaddons;
            this.prompt({
                type: 'checkbox',
                name: 'EBXaddons',
                message: 'Which EBX addons would you use?',
                choices: choices,
                store: false
            }, function(answers) {
                this.inputs.EBXaddons = [];
                _.forEach(this.EBXaddons, function(addon) {
                    if (answers.EBXaddons.indexOf(addon.name) >= 0) {
                        this.inputs.EBXaddons.push(addon);
                    }
                }, this);
                done();
            }.bind(this));
        }
    },

    askPresalesToolbox: function askPresalesToolbox() {
        var done = this.async();
        this.prompt({
            type: 'confirm',
            name: 'presalesToolbox',
            message: 'Would you use the Presales Toolbox?',
            store: true
        }, function(answers) {
            this.inputs.presalesToolbox = answers.presalesToolbox;
            done();
        }.bind(this));
    },

    askWorkspaceDir: function askWorkspaceDir() {
        var done = this.async();
        var choices = [];

        if (_.isString(this.userConfig.workspaceDirs)) {
            this.userConfig.workspaceDirs = [this.userConfig.workspaceDirs];
        }

        _.forEach(this.userConfig.workspaceDirs, function(dir) {
            var defaultDir = dir || '.\\';
            if (this.inputs.prospect && this.inputs.prospect !== '') {
                defaultDir = path.join(defaultDir, this.inputs.prospect);
            }
            if (this.inputs.context && this.inputs.context !== '') {
                defaultDir = path.join(defaultDir, this.inputs.context);
            }
            choices.push(defaultDir);
        }, this);

        var currentDir = '.\\';
        if (choices.indexOf(currentDir) === -1) {
            choices.push(currentDir);
        }

        var contextualizedDir = currentDir;
        if (this.inputs.prospect && this.inputs.prospect !== '') {
            if (choices.indexOf(currentDir + this.inputs.prospect) === -1) {
                choices.push(currentDir + this.inputs.prospect);
            }
            contextualizedDir = path.join(contextualizedDir, this.inputs.prospect);
        }
        if (this.inputs.context && this.inputs.context !== '') {
            if (choices.indexOf(currentDir + this.inputs.context) === -1) {
                choices.push(currentDir + this.inputs.context);
            }
            contextualizedDir = path.join(contextualizedDir, this.inputs.context);
        }
        if (choices.indexOf(currentDir + contextualizedDir) === -1) {
            choices.push(currentDir + contextualizedDir);
        }

        this.prompt({
            type: 'list',
            name: 'workspaceDir',
            message: 'Where would you like to install the workspace?',
            choices: choices,
            default: 0,
            store: false
        }, function(answers) {
            this.inputs.workspaceDir = answers.workspaceDir;
            this.workspaceDir = this.destinationPath(this.inputs.workspaceDir);
            done();
        }.bind(this));
    }
};
