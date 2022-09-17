import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (data, format) => {
  if (format === 'stylish') {
    return makeStylish(data);
  }
  if (format === 'plain') {
    return makePlain(data);
  }
};
