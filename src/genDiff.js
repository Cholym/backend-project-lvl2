import _ from 'lodash';

export const isObject = (value) => typeof value === 'object' && value !== null;

const genDiff = (obj1, obj2) => {
  const obj1Keys = _.keys(obj1);
  const obj2Keys = _.keys(obj2);
  const keys = _.union(obj1Keys, obj2Keys).sort();

  const result = {};
  const ifAdded = (key) => !_.has(obj1, key);

  const ifDeleted = (key) => !_.has(obj2, key);

  const ifChanged = (key) => obj1[key] !== obj2[key];

  const addStylishObject = (object) => {
    const entries = _.entries(object);
    return entries.reduce((acc, pair) => {
      const [key, value] = pair;
      let formattedKey = key;
      if (!key.startsWith('+') || !key.startsWith('-')) {
        formattedKey = `  ${key}`;
      }
      if (isObject(value)) {
        acc[formattedKey] = addStylishObject(value);
        return acc;
      }
      acc[formattedKey] = value;
      return acc;
    }, {});
  };

  const addKeyData = (key) => {
    if (ifAdded(key)) {
      result[`+ ${key}`] = isObject(obj2[key]) ? addStylishObject(obj2[key]) : obj2[key];
    } else if (ifDeleted(key)) {
      result[`- ${key}`] = isObject(obj1[key]) ? addStylishObject(obj1[key]) : obj1[key];
    } else if (ifChanged(key) && isObject(obj1[key]) && isObject(obj2[key])) {
      result[(`  ${key}`)] = genDiff(obj1[key], obj2[key]);
    } else if (ifChanged(key)) {
      result[`- ${key}`] = isObject(obj1[key]) ? addStylishObject(obj1[key]) : obj1[key];
      result[`+ ${key}`] = isObject(obj2[key]) ? addStylishObject(obj2[key]) : obj2[key];
    } else {
      result[(`  ${key}`)] = isObject(obj1[key]) ? addStylishObject(obj1[key]) : obj1[key];
    }
  };

  keys.map((key) => addKeyData(key));
  return result;
};

export default genDiff;
