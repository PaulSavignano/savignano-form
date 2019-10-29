import { useEffect, useContext } from 'react'

import Context from './Context'
import getIn from './utils/getIn'
import getCheckedProps from './utils/getCheckedProps'
import getValue from './utils/getValue'

function useFormField({
  name,
  id,
  onBlur,
  onChange,
  onFormat,
  onParse,
  onValidate,
  type,
  value,
}) {
  const ctx = useContext(Context)
  console.log('useFormField name ', name)
  if (!name) throw Error('useFormField requires a name')
  const fieldRegisterProps = {
    id,
    name,
    onBlur,
    onChange,
    onFormat,
    onParse,
    onValidate,
    type,
    value,
  }
  useEffect(() => {
    ctx.onRegisterField(fieldRegisterProps)
    return () => ctx.onUnregisterField({ name })
  })
  const stateValue = getIn(ctx.values, name)
  return {
    ...getCheckedProps({ stateValue, type, value }),
    error: getIn(ctx.errors, name),
    isTouched: Boolean(getIn(ctx.touched, name)),
    onBlur: ctx.onBlur,
    onChange: ctx.onChange,
    value: getValue({ type, onFormat, value: value || stateValue })
  }
}

export default useFormField