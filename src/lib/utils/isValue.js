function isValue(value) {
  if (typeof value === 'boolean') return true
  if (typeof value === 'number') return true
  if (value) return true
  return false
}

export default isValue
