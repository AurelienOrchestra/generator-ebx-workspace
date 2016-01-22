'use strict';
var chalk = require('chalk');
var yosay = require('yosay');
var child_process = require('child_process');

module.exports = {

    separator: function separator() {
        this.log();
        this.log('-------------------------------');
        this.log();
    },

    launchEclipse: function launchEclipse() {
        if (this.userConfig.eclipseExe) {
            var done = this.async();
            this.prompt({
                type: 'confirm',
                name: 'launchEclipse',
                message: 'Launch this workspace in Eclipse?',
                default: true,
                store: false
            }, function(answers) {
                if (answers.launchEclipse) {
                    var eclipseCmd = this.userConfig.eclipseExe +
                        ' -data "' + this.workspaceDir + '"';
                    this.log(chalk.green('launching') + ' ' + eclipseCmd);
                    child_process.exec(eclipseCmd, function execEclipse(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                done();
            }.bind(this));
        }
    },

    licenseReminder: function licenseReminder() {
        this.log();
        this.log(chalk.yellow(
            'The license might be expired, don\'t forget to get a new one!'
        ));
        this.log();
    },

    goodbye: function goodbye() {
        this.log(yosay('Thanks for using ' + chalk.blue('EBX Workspace') +
            ' generator!'));
    }
};
