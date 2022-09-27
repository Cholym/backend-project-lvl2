import yaml from 'js-yaml';

const parseData = (dataFormat, data) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('Unsupported format. Accepts only YAML and JSON files');
  }
};

export default parseData;
