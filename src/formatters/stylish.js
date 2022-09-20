import _ from 'lodash';

const spaces = 4;
const space = (count) => ' '.repeat(count * spaces);

const getValue = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const bracketEndIndent = space(depth - 1);
  const lines = Object.entries(node).map(([key, value]) => `${space(depth)}${key}: ${getValue(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketEndIndent}}`,
  ].join('\n');
};

const makeStylish = (data, depth = 1) => {
  const indent = space(depth).slice(0, space(depth) - 2);
  const bracketEndIndent = space(depth - 1);

  const lines = data.flatMap((diff) => {
    switch (diff.type) {
      case 'nested':
        return `${indent}  ${diff.key}: ${makeStylish(diff.children, depth + 1)}`;
      case 'added':
        return `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${diff.key}: ${getValue(diff.value1, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`,
          `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`,
        ];
      default:
        throw new Error(`Unknown type of data: ${diff.type}`);
    }
  });

  return [
    '{',
    ...lines,
    `${bracketEndIndent}}`,
  ].join('\n');
};

export default makeStylish;
