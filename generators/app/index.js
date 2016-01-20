'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

    initializing: require('./initialize'),

    prompting: require('./prompt'),

    configuring: {},

    writing: {},

    install: {},

    end: {}

});
