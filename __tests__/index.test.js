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

test('JSON differences', () => {
  expect(formattedDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readResultStylish);
});
test('YML differences', () => {
  expect(formattedDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readResultStylish);
});
test('plain JSON differences', () => {
  expect(formattedDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readResultPlain);
});
test('plain YML differences', () => {
  expect(formattedDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readResultPlain);
});
test('wrong format', () => {
  expect(() => formattedDiff(getFixturePath('file.xml'), getFixturePath('file2.yml'), 'stylish')).toThrow('Unsupported format. Accepts only YAML and JSON files');
});
test('wrong format', () => {
  expect(() => formattedDiff(getFixturePath('file.xml'), getFixturePath('file2.yml'), 'plain')).toThrow('Unsupported format. Accepts only YAML and JSON files');
});
