import fs from 'fs';
import path from 'path';
import genDiff from './genDiff.js';

const getExtName = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => {
  const currentPath = process.cwd();
  const absolutePath = path.resolve(currentPath, filepath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  //const extName = getExtName(filepath);
  return JSON.parse(fileData);
};

export default (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  const differences = genDiff(data1, data2);
  let result = ['{']
  //console.log('{');
  function formatted(diffs) {
    JSON.stringify(diffs, function replacer(key, value) {
      if (typeof value === 'object') {
        return (key, value);
      }
      result.push(`  ${key}: ${value}`);
      return (key, value);
    });
  }
  formatted(differences);
  result.push('}');
  const finalResult = result.join('\n');
  console.log(finalResult);
  return finalResult;
};
