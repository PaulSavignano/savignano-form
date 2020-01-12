function getCheckedProp({
  formValue,
  radioValue,
  type,
}) {
  switch (type) {
    case 'checkbox':
      return { checked: Boolean(formValue) }
    case 'radio':
      return { checked: formValue === radioValue }
    default:
      return {}
  }
}

export default getCheckedProp
