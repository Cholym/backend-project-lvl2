import makeStylish from './stylish.js';

export default (data, format) => {
  if (format === 'stylish') {
    return makeStylish(data);
  }
  throw new Error('Unknown format. Enter "stylish"');
};
