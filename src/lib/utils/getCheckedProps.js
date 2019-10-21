function getCheckedProps({ stateValue, type, value }) {
  switch (type) {
    case 'checkbox':
      return { checked: Boolean(stateValue) }
    case 'radio':
      return { checked: value === stateValue }
    default:
      return undefined
  }
}

export default getCheckedProps
