import { useEffect, useContext, useMemo, useRef } from 'react'

import FormContext from './FormContext'
import getCheckedProps from './utils/getCheckedProp'
import getIn from './utils/getIn'

export function getValue({
  errors,
  formValue,
  onFormat,
  radioValue,
  touched,
  type,
  values,
}) {
  if (!formValue) {
    if (type === 'checkbox') return false
    return ''
  }
  if (type === 'radio') return radioValue
  if (onFormat) {
    return onFormat({
      errors,
      getIn,
      touched,
      value: formValue,
      values,
    })
  }
  return formValue
}

function useFormField({
  id,
  isPersistOnUnmount,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate: onValidateProp,
  type = 'text',
  value: radioValue,
}) {
  const {
    errors,
    onBlur,
    onChange,
    onRegisterField,
    onUnregisterField,
    touched,
    values,
  } = useContext(FormContext)
  const onValidate = useRef(onValidateProp)
  if (!name) throw Error('useFormField requires a name')

  useEffect(() => {
    onRegisterField({
      id,
      name,
      label,
      onBlur: onBlurCallback,
      onChange: onChangeCallback,
      onFormat,
      onParse,
      onValidate: onValidate.current,
      type,
      value: radioValue,
    })
    return () => {
      if (!isPersistOnUnmount) {
        onUnregisterField({ name })
      }
    }
  }, [id, isPersistOnUnmount, label, name, onBlurCallback, onChangeCallback, onFormat, onParse, onRegisterField, onUnregisterField, radioValue, type])

  const formValue = getIn(values, name)
  const error = getIn(errors, name)
  const isTouched = Boolean(getIn(touched, name))
  const value = getValue({
    errors,
    formValue,
    onFormat,
    radioValue,
    touched,
    type,
    values
  })

  return useMemo(() => ({
    ...getCheckedProps({ type, formValue, radioValue }),
    error,
    label,
    isTouched,
    name,
    onBlur,
    onChange,
    type,
    value,
  }), [error, formValue, isTouched, label, name, onBlur, onChange, radioValue, type, value])
}

export default useFormField