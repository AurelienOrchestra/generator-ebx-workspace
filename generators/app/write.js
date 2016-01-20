'use strict';
var chalk = require('chalk');

module.exports = {

    generateEBXHome: function generateEBXHome() {
        this.composeWith('ebx-workspace:ebxHome', {
            options: {
                workspacePath: this.workspacePath
            }
        }, {
            local: require.resolve('../ebxHome')
        });
    },

    generateEBXProject: function generateEBXProject() {
        this.composeWith('ebx-workspace:ebxProject', {
            options: {
                modulePath: this.modulePath,
                moduleName: this.inputs.moduleName
            }
        }, {
            local: require.resolve('../ebxProject')
        });
    },

    generateEBXServer: function generateEBXServer() {
        this.composeWith('ebx-workspace:ebxServer', {
            options: {
                workspacePath: this.workspacePath,
                moduleName: this.inputs.moduleName,
                userConfig: this.userConfig,
                EBXcoreVersion: this.inputs.EBXcoreVersion,
                EBXaddonsVersion: this.inputs.EBXaddonsVersion,
                hasAddon: this.hasAddon,
                EBXaddons: this.inputs.EBXaddons,
                presalesToolbox: this.inputs.presalesToolbox
            }
        }, {
            local: require.resolve('../ebxServer')
        });
    }

};
