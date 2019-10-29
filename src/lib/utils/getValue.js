function getValue({ type, onFormat, value }) {
  console.log('getValue ', value)
  if (!value) {
    if (type === 'text') return ''
    if (type === 'checkbox') return false
  }
  return onFormat ? onFormat(value) : value
}

export default getValue