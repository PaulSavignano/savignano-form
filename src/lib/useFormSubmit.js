import { useContext, useMemo } from 'react'

import FormContext from './FormContext'

const useFormSubmit = () => {
  const {
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    onSubmit,
    submitError
  } = useContext(FormContext)
  return useMemo(() => {
    return {
      isSubmitting,
      isSubmitSuccess,
      isSubmitError: Boolean(submitError),
      isDisabled: isSubmitting || isErrors,
      onSubmit
    }
  }, [
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    onSubmit,
    submitError
  ])
}

export default useFormSubmit