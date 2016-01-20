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
    }

};
