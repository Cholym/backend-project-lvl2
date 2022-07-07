#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();

// Commands


// Options
program
.description('Compares two configuration files and shows a difference.')
.version('0.0.1')
.option('-f, --format <type>', 'output format')
.argument('<filepath1>')
.argument('<filepath2>')

program.parse(process.argv);
