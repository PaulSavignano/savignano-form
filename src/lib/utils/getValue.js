function getValue({ type, onFormat, value }) {
  if (!value) {
    if (type === 'text') return ''
    if (type === 'checkbox') return false
    return value
  }
  return onFormat ? onFormat(value) : value
}

export default getValue