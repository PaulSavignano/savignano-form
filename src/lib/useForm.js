import { useContext } from 'react'

import Context from './Context'

function useForm() {
  console.log('inside useForm')
  const ctx = useContext(Context)

  return ctx
}

export default useForm