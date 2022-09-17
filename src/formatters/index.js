import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(data);
    case 'plain':
      return makePlain(data);
    default:
      return makeStylish(data);
  }
};
