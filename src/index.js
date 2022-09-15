import fs from 'fs';
import path from 'path';
import genDiff from './genDiff.js';
import parseData from './parsers.js';
import formatsNav from './formatters/formatsNav.js';

const getExtName = (filepath) => path.extname(filepath);

const getFileData = (filepath) => {
  const currentPath = process.cwd();
  const absolutePath = path.resolve(currentPath, filepath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  const extName = getExtName(filepath);
  const parsedData = parseData(extName, fileData);
  return parsedData;
};

export default (filepath1, filepath2, format) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  const differences = genDiff(data1, data2);
  return formatsNav(differences, format);
};
