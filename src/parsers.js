import yaml from 'js-yaml';

const parseData = (extName, fileData) => {
  if (extName === '.json') {
    return JSON.parse(fileData);
  }
  if (extName === '.yml' || extName === '.yaml') {
    return yaml.load(fileData);
  }
  throw new Error('Unsupported format. Accepts only YAML and JSON files');
};

export default parseData;
