#!/usr/bin/env node
import { Command } from 'commander';
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
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
