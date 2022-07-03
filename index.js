#!/usr/bin/env node
const { Command } = require('commander')
const add = require('./bin/add')
const create = require('./bin/create')
const program = new Command()

program
  .name('witchly')
  .description('CLI service for Witchly.js')
  .version('1.0.0')

program.command('create')
  .description('Create a new project')
  .argument('<project>', 'name of project')
  .action(create)

program.command('add')
  .description('Install development add-ons')
  .argument('<preset>', 'name of preset')
  .action(add)

program.parse()
