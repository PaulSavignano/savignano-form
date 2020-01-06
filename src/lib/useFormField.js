import { useEffect, useContext, useMemo } from 'react'

import FormContext from './FormContext'
import getCheckedProps from './utils/getCheckedProps'
import getIn from './utils/getIn'
import getValue from './utils/getValue'

function useFormField({
  id,
  isPersistOnUnmount,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate,
  type = 'text',
  value,
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
      onValidate,
      type,
      value,
    })
    return () => {
      if (!isPersistOnUnmount) {
        onUnregisterField({ name })
      }
    }
  }, [id, isPersistOnUnmount, label, name, onBlurCallback, onChangeCallback, onFormat, onParse, onRegisterField, onUnregisterField, onValidate, type, value])

  const stateValue = getIn(values, name)
  const valueToUse = getValue({ type, onFormat, value: value || stateValue })
  const checkedProps = getCheckedProps({ stateValue, type, value }) || {}
  const error = getIn(errors, name)
  const isTouched = Boolean(getIn(touched, name))

  return useMemo(() => ({
    ...checkedProps,
    error,
    label,
    isTouched,
    name,
    onBlur,
    onChange,
    type,
    value: valueToUse,
  }), [checkedProps, error, isTouched, label, name, onBlur, onChange, type, valueToUse])
}

export default useFormField