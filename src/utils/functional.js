// eslint-disable-next-line import/prefer-default-export, require-jsdoc
export function objMap(obj, func) {
  const keys = Object.keys(obj)
  const keysLen = keys.length
  const result = []

  for (let i = 0; i < keysLen; i++) {
    result.push(func(obj[keys[i]], keys[i]))
  }

  return result
}
