function handleInputEvent(e) {
  if (e && e.target && e.target.name) {
    return { name: e.target.name, value: e.target.value, checked: e.target.checked }
  }
  return { name: e.name, value: e.value }
}

export default handleInputEvent