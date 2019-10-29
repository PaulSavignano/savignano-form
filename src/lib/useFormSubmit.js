import { useContext } from 'react'

import Context from './Context'

function useFormSubmit() {
  const {
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    onSubmit,
    submitError
  } = useContext(Context)
  return {
    isSubmitting,
    isSubmitSuccess,
    isSubmitError: Boolean(submitError),
    isDisabled: isSubmitting || isErrors,
    onSubmit
  }
}

export default useFormSubmit