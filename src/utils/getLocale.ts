import constants from '../constants/default';

function $l(key: string) {
  // eslint-disable-next-line no-prototype-builtins
  if (constants.hasOwnProperty(key)) {
    return constants[key];
  } else {
    throw new Error(`Key '${key}' not found in constants object.`);
  }
}

export { $l };