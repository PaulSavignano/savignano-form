import { useEffect, useContext, useMemo } from 'react'

import FormContext from './FormContext'
import getCheckedProps from './utils/getCheckedProps'
import getIn from './utils/getIn'
import getValue from './utils/getValue'

function useFormField({
  id,
  isPersistOnUnmount,
  name,
  onBlur,
  onChange,
  onFormat,
  onParse,
  onValidate,
  type = 'text',
  value,
}) {
  const ctx = useContext(FormContext)
  const { onUnregisterField, onRegisterField, onChange: ctxOnChange, onBlur: ctxOnBlur } = ctx
  if (!name) throw Error('useFormField requires a name')

  useEffect(() => {
    onRegisterField({
      id,
      name,
      onBlur,
      onChange,
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
  }, [
    id,
    isPersistOnUnmount,
    name,
    onBlur,
    onChange,
    onFormat,
    onParse,
    onRegisterField,
    onUnregisterField,
    onValidate,
    type,
    value
  ])

  const stateValue = getIn(ctx.values, name)
  const valueToUse = getValue({ type, onFormat, value: value || stateValue })
  const checkedProps = getCheckedProps({ stateValue, type, value }) || {}
  const error = getIn(ctx.errors, name)
  const isTouched = Boolean(getIn(ctx.touched, name))

  return useMemo(() => ({
    ...checkedProps,
    error,
    isTouched,
    name,
    onBlur: ctxOnBlur,
    onChange: ctxOnChange,
    type,
    value: valueToUse,
  }), [
    checkedProps,
    ctxOnBlur,
    ctxOnChange,
    error,
    isTouched,
    name,
    type,
    valueToUse
  ])
}

export default useFormField