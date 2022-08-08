import _ from 'lodash';

export default (obj1, obj2) => {
  const result = [];
  const firstObjKeys = _.keys(obj1);
  const secondObjKeys = _.keys(obj2);
  const keys = _.union(firstObjKeys, secondObjKeys).sort();
  if (keys.length === 0) {
    return result;
  }
  const ifAdded = (key) => {
    if (!firstObjKeys.includes(key) && secondObjKeys.includes(key)) {
      return true;
    }
  };

  const ifDeleted = (key) => {
    if (firstObjKeys.includes(key) && !secondObjKeys.includes(key)) {
      return true;
    }
  };

  const ifChanged = (key) => {
    if (firstObjKeys.includes(key) && secondObjKeys.includes(key)) {
      if (obj1[key] !== obj2[key]) {
        return true;
      }
    }
  };

  const ifUnchanged = (key) => {
    if (firstObjKeys.includes(key) && secondObjKeys.includes(key)) {
      if (obj1[key] === obj2[key]) {
        return true;
      }
    }
  };

  const data = {};

  const addKeyData = (key) => {
    if (ifAdded(key)) {
      if (obj2[key] !== undefined) {
        data[`+ ${key}`] = obj2[key];
      } data[`+ ${key}`] = true;
      return;
    }
    if (ifDeleted(key)) {
      data[`- ${key}`] = obj1[key];
      return;
    }
    if (ifChanged(key)) {
      data[`- ${key}`] = obj1[key];
      data[`+ ${key}`] = obj2[key];
      return;
    }
    if (ifUnchanged(key)) {
      data[(`  ${key}`)] = obj1[key];
    }
  };

  keys.map((key) => addKeyData(key));
  return data;
};
