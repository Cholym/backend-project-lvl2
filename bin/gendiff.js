#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';

const program = new Command();

// Commands
program
.description('Compares two configuration files and shows a difference.')
.version('0.0.1')

program.parse();
