import { useContext } from 'react'

import FormContext from './FormContext'

function useForm() {
  const ctx = useContext(FormContext)
  return ctx
}

export default useForm