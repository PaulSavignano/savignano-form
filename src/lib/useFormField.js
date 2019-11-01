import { useEffect, useContext, useMemo } from 'react'

import FormContext from './FormContext'
import getIn from './utils/getIn'
import getCheckedProps from './utils/getCheckedProps'
import getValue from './utils/getValue'

function useFormField({
  name,
  id,
  onBlur,
  onChange,
  isPersistOnUnmount,
  onFormat,
  onParse,
  onValidate,
  type = 'text',
  value,
}) {
  const ctx = useContext(FormContext)
  if (!name) throw Error('useFormField requires a name')
  useEffect(() => {
    ctx.onRegisterField({
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
        ctx.onUnregisterField({ name })
      }
    }
  }, [])
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
    onBlur: ctx.onBlur,
    onChange: ctx.onChange,
    type,
    value: valueToUse,
  }), [
    value,
    valueToUse,
    checkedProps.checked,
    error,
    isTouched,
  ])
}

export default useFormField