#!/usr/bin/env node
import { Command } from 'commander'
import create from './bin/create.js'
const program = new Command()

program
  .name('witchly')
  .description('A CLI service for Witchly.js')
  .version('1.0.3')

program.command('create')
  .description('Create a new project')
  .argument('<project>', 'name of project')
  .action(create)

program.parse()
