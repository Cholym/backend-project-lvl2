import _ from 'lodash';

const makeStylish = (obj) => {
  const result = [];

  const addObject = (object, startDepth = 0) => {
    let depth = startDepth;
    const entries = _.entries(object);
    return entries.reduce((acc, pair) => {
      const [key, value] = pair;
      if (typeof value === 'object' && value !== null) {
        depth += 2;
        acc.push(([' '.repeat(depth), `${key}: {`].join('')));
        depth += 2;
        const deepObject = addObject(value, depth);
        acc.push(deepObject);
        acc.push(([' '.repeat(depth), '}'].join('')));
        depth -= 4;
        return acc;
      }
      depth += 2;
      acc.push([' '.repeat(depth), `${key}: ${value}`].join(''));
      depth -= 2;
      return acc;
    }, []);
  };
  function formatted(diffs) {
    result.push('{');
    result.push(addObject(diffs));
  }
  formatted(obj);
  result.push('}');
  const finalResult = result.flat(Infinity).join('\n');
  return finalResult;
};

export default makeStylish;
