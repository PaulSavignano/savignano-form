import { useContext, useMemo } from 'react'

import FormContext from './FormContext'
import getIn from './utils/getIn'

function useFormSpy({ names }) {
  const { values } = useContext(FormContext)
  const spiedValues = names.reduce((a, name) => {
    a[name] = getIn(values, name)
    return a
  }, {})
  return useMemo(() => ({
    values: spiedValues
  }), [spiedValues])
}

export default useFormSpy
