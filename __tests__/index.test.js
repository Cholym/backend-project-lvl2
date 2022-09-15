import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import formattedDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const readFileDiff = readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');

test('JSON differences', () => {
  expect(formattedDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFileDiff);
});
test('YML differences', () => {
  expect(formattedDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFileDiff);
});
