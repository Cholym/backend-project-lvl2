import { readFileSync } from 'node:fs';
import genDiff from '../src/genDiff.js';

export default (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf8');
  const data2 = readFileSync(filepath2, 'utf8');
  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  const differences = genDiff(dataParse1, dataParse2);
  console.log(differences);
}


