#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

// Commands
/*
1. принять файлы в программу →
— импортировать readfileSync
— создать переменную

3. json - это строка, нужно «распарсить» два файла в объект, чтобы можно было сравнить
—JSON.parse - метод, помогающий распарсить данные в объект в переменную

4. написать функцию, чтобы можно было сравнить два эти объекта
*/
// Options
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse(process.argv);
