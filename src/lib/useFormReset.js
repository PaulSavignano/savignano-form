import { useContext, useMemo } from 'react'

import FormContext from './FormContext'
import getIn from './utils/getIn'

function useFormReset(names = []) {
  const { onReset, touched } = useContext(FormContext)
  const isDisabled = names.length ? names.reduce((a, name) => {
    const isTouched = getIn(touched, name)
    if (isTouched) {
      a = false
    }
    return a
  }, true) : Boolean(!Object.keys(touched).length)
  return useMemo(() => ({
    onReset,
    isDisabled,
  }), [isDisabled, onReset])
}

export default useFormReset
