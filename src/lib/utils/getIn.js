import getPath from './getPath'

function getIn(state, fieldName) {
  const path = getPath(fieldName)
  let current = state
  for (let i = 0; i < path.length; i += 1) {
    const key = path[i]
    if (
      current === undefined ||
      current === null ||
      typeof current !== 'object' ||
      (Array.isArray(current) && Number.isNaN(key))
    ) {
      return undefined
    }
    current = current[key]
  }
  return current
}

export default getIn
