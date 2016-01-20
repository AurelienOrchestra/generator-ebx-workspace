'use strict';
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');

module.exports = {

    welcome: function welcome() {
        this.log(yosay(
            'Welcome to the ' + chalk.blue('EBX Workspace') + ' generator!'
        ));
    },

    getUserConfiguration: function getUserConfiguration() {
        var userHomeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
        this.userConfigurationFileLocation = path.join(userHomeDir,
            './.ebxworkspacerc.json');
        this.userConfig = {};
        if (this.fs.exists(this.userConfigurationFileLocation)) {
            this.userConfig = require(this.userConfigurationFileLocation);
        } else {
            this.log(chalk.yellow(
                'Your configuration file has not been found!'
            ));
            this.log();
        }
    },

    setEBXcoreBinDir: function setEBXcoreBinDir() {
        if (!this.userConfig.EBXcoreBinDir) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'EBXcoreBinDir',
                message: 'Where are located your EBX core releases?',
                store: true
            }, function(answers) {
                this.userConfig.EBXcoreBinDir = answers.EBXcoreBinDir;
                this.userConfigChanged = true;
                done();
            }.bind(this));
        }
    },

    setEBXaddonBinDir: function setEBXaddonBinDir() {
        if (!this.userConfig.EBXaddonBinDir) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'EBXaddonBinDir',
                message: 'Where are located your EBX addons releases?',
                store: true
            }, function(answers) {
                this.userConfig.EBXaddonBinDir = answers.EBXaddonBinDir;
                this.userConfigChanged = true;
                done();
            }.bind(this));
        }
    },

    setPresalesToolboxBinDir: function setPresalesToolboxBinDir() {
        if (!this.userConfig.PresalesToolboxBinDir) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'PresalesToolboxBinDir',
                message: 'Where is located your Presales toolbox files?',
                store: true
            }, function(answers) {
                this.userConfig.PresalesToolboxBinDir = answers.PresalesToolboxBinDir;
                this.userConfigChanged = true;
                done();
            }.bind(this));
        }
    },

    setWorkspaceDir: function setWorkspaceDir() {
        if (!this.userConfig.workspaceDirs) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'workspaceDirs',
                message: 'Where is located your workspace directory?',
                store: true
            }, function(answers) {
                this.userConfig.workspaceDirs = answers.workspaceDirs;
                this.userConfigChanged = true;
                done();
            }.bind(this));
        }
    },

    setEclipseExe: function setEclipseExe() {
        if (!this.userConfig.eclipseExe) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'eclipseExe',
                message: 'Where is located your Eclipse exe?',
                store: true
            }, function(answers) {
                this.userConfig.eclipseExe = answers.eclipseExe;
                this.userConfigChanged = true;
                done();
            }.bind(this));
        }
    },

    writeUserConfiguration: function writeUserConfiguration() {
        if (this.userConfigChanged) {
            if (this.fs.exists(this.userConfigurationFileLocation)) {
                this.fs.delete(this.userConfigurationFileLocation);
            }
            this.fs.writeJSON(this.userConfigurationFileLocation, this.userConfig);
        }
    },

    setGetDirectories: function setGetDirectories() {
        this.getDirectories = function getDirectories(srcpath) {
            return fs.readdirSync(srcpath).filter(function(file) {
                return fs.statSync(path.join(srcpath, file)).isDirectory();
            });
        }
    },

    setEBXcoreVersions: function setEBXcoreVersions() {
        this.EBXcoreVersions = this.getDirectories(this.userConfig.EBXcoreBinDir);
    },

    setEBXaddonsVersions: function setEBXaddonsVersions() {
        this.EBXaddonsVersions = this.getDirectories(this.userConfig.EBXaddonBinDir);
    },

    initializeAddonsList: function initializeAddonsList() {
        this.EBXaddons = require('./addons.json');
    },

    initializeUserInputs: function initializeUserInputs() {
        this.inputs = {};
    },

    endConfiguration: function endConfiguration() {
        this.log();
        this.log('-------------------------------');
        this.log();
    }

};
