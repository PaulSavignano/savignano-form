import { useEffect, useContext, useMemo, useCallback } from 'react'

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
  const { onUnregisterField, onRegisterField, onChange: ctxOnChange, onBlur: ctxOnBlur } = ctx
  if (!name) throw Error('useFormField requires a name')
  const onRegister = useCallback(() => onRegisterField({
    id,
    name,
    onBlur,
    onChange,
    onFormat,
    onParse,
    onValidate,
    type,
    value,
  }), [id, name, onBlur, onChange, onFormat, onParse, onRegisterField, onValidate, type, value])
  const onUnRegister = useCallback(() => {
    if (!isPersistOnUnmount) {
      onUnregisterField({ name })
    }
  }, [isPersistOnUnmount, onUnregisterField, name])
  useEffect(() => {
    onRegister()
    return () => {
      onUnRegister()
    }
  }, [onRegister, onUnRegister])
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
  }), [checkedProps, ctxOnBlur, ctxOnChange, error, isTouched, name, type, valueToUse])
}

export default useFormField