import { useContext, useMemo } from 'react'

import FormContext from './FormContext'

function useFormReset() {
  const { onReset } = useContext(FormContext)
  return useMemo(() => ({
    onReset
  }), [onReset])
}

export default useFormReset
