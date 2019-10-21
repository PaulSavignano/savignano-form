import getPath from './getPath'

function setInRecursor({ current, index = 0, path, value }) {
  if (index >= path.length) return value

  const key = path[index]

  // key is NOT a number, handle object
  if (Number.isNaN(Number(key))) {
    if (current === undefined || current === null) {
      const result = setInRecursor({
        current: undefined,
        index: index + 1,
        path,
        value
      })
      return result === undefined ? undefined : { [key]: result }
    }
    if (Array.isArray(current)) {
      throw new Error('Cannot set a non-numeric property on an array')
    }

    const result = setInRecursor({
      current: current[key],
      index: index + 1,
      path,
      value
    })
    if (result === undefined) {
      const numKeys = Object.keys(current).length
      if (current[key] === undefined && numKeys === 0) {
        return undefined
      }
      if (current[key] !== undefined && numKeys <= 1) {
        return undefined
      }
      const { [key]: deleted, ...final } = current
      return final
    }
    return {
      ...current,
      [key]: result
    }
  }

  // array
  const numericKey = Number(key)
  if (current === undefined || current === null) {
    const result = setInRecursor({
      current: undefined,
      index: index + 1,
      path,
      value
    })
    if (result === undefined) {
      return undefined
    }

    const array = []
    array[numericKey] = result
    return array
  }

  if (!Array.isArray(current)) {
    throw new Error('Cannot set a numeric property on an object')
  }

  const existingValue = current[numericKey]
  const result = setInRecursor({
    current: existingValue,
    index: index + 1,
    path,
    value
  })

  const array = [...current]
  if (result === undefined) {
    array.splice(numericKey, 1)
    if (array.length === 0) return undefined
  } else {
    array[numericKey] = result
  }
  return array
}

function setIn(state = {}, name, value) {
  if (name === undefined || name === null) {
    throw Error(`Cannot call setIn() with ${String(name)} name`)
  }
  const emptyReturn = Array.isArray(state) ? [] : {}
  return (
    setInRecursor({
      current: state,
      path: getPath(name),
      value
    }) || emptyReturn
  )
}

export default setIn
