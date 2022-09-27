import yaml from 'js-yaml';

const parseData = (dataFormat, data) => {
  const formattedFormat = dataFormat.slice(1);
  if (formattedFormat === 'json') {
    return JSON.parse(data);
  }
  if (formattedFormat === 'yml' || formattedFormat === 'yaml') {
    return yaml.load(data);
  }
  throw new Error('Unsupported format. Accepts only YAML and JSON files');
};

export default parseData;
