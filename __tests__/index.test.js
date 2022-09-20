import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import formattedDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const readResultStylish = readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const readResultPlain = readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const readResultJSON = readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');

test('stylish JSON differences', () => {
  expect(formattedDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readResultStylish);
});
test('stylish YML differences', () => {
  expect(formattedDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readResultStylish);
});
test('plain JSON differences', () => {
  expect(formattedDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readResultPlain);
});
test('plain YML differences', () => {
  expect(formattedDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readResultPlain);
});
test('JSON format of YML differences', () => {
  expect(formattedDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(readResultJSON);
});
test('JSON format of JSON differences', () => {
  expect(formattedDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readResultJSON);
});
test('wrong extension, stylish', () => {
  expect(() => formattedDiff(getFixturePath('file.xml'), getFixturePath('file2.yml'), 'stylish')).toThrow('Unsupported format. Accepts only YAML and JSON files');
});
test('wrong extension, plain', () => {
  expect(() => formattedDiff(getFixturePath('file.xml'), getFixturePath('file2.yml'), 'plain')).toThrow('Unsupported format. Accepts only YAML and JSON files');
});
