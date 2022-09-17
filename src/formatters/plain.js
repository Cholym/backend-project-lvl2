import _ from 'lodash';
import { isObject } from '../genDiff.js';

const formatKey = (key) => key.slice(2);

const formatValue = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

export default (data) => {
  const path = [];

  const analyseObject = (object) => {
    const entries = _.entries(object);
    const keys = _.keys(object);

    return entries.reduce((acc, pair) => {
      const [key, value] = pair;

      if (key.startsWith('-')) {
        path.push(formatKey(key));
        const plusKey = `+ ${[formatKey(key)]}`;
        if (keys.includes(plusKey)) {
          acc.push(`Property '${path.join('.')}' was updated. From ${formatValue(object[key])} to ${formatValue(object[plusKey])}`);
        } else {
          acc.push(`Property '${path.join('.')}' was removed`);
        }
        path.pop();
        return acc;
      }

      if (key.startsWith('+')) {
        path.push(formatKey(key));
        if (!keys.includes(`- ${formatKey(key)}`)) {
          acc.push(`Property '${path.join('.')}' was added with value: ${formatValue(value)}`);
        }
        path.pop();
        return acc;
      }

      if (isObject(value)) {
        path.push(formatKey(key));
        acc.push(analyseObject(value));
      } else if (key.startsWith('  ')) {
        return acc;
      }
      path.pop();
      return acc;
    }, []);
  };

  const result = analyseObject(data);
  return result.flat(Infinity).join('\n');
};
