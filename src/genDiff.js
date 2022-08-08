import _ from 'lodash';

export default (obj1, obj2) => {
  const obj1Keys = _.keys(obj1);
  const obj2Keys = _.keys(obj2);
  const keys = _.union(obj1Keys, obj2Keys).sort();

  const result = {};
  const ifAdded = (key) => !Object.hasOwn(obj1, key);

  const ifDeleted = (key) => !Object.hasOwn(obj2, key);

  const ifChanged = (key) => obj1[key] !== obj2[key];

  const addKeyData = (key) => {
    if (ifAdded(key)) {
      result[`+ ${key}`] = obj2[key];
      result[`+ ${key}`] = true;
    } else if (ifDeleted(key)) {
      result[`- ${key}`] = obj1[key];
    } else if (ifChanged(key)) {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    } else {
      result[(`  ${key}`)] = obj1[key];
    }
  };

  keys.map((key) => addKeyData(key));
  return result;
};
