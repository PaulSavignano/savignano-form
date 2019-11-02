function handleInputEvent(e) {
  if (e && e.target && e.target.name) {
    return { name: e.target.name, value: e.target.value, checked: e.target.checked }
  }
  console.log('handleInputEvent ', e)
  return { name: e.name, value: e.value }
}

export default handleInputEvent