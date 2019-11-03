import { useContext, useMemo } from 'react'

import FormContext from './FormContext'

const useFormSubmit = () => {
  const {
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    isTouched,
    onSubmit,
    submitError
  } = useContext(FormContext)
  return useMemo(() => {
    const isSubmitError = Boolean(submitError)
    const isClean = Boolean(!isTouched)
    const isDisabled = isSubmitting || isErrors || isSubmitError || isClean
    return {
      isClean,
      isDisabled,
      isErrors,
      isSubmitError,
      isSubmitSuccess,
      isSubmitting,
      onSubmit,
      submitError
    }
  }, [
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    isTouched,
    onSubmit,
    submitError
  ])
}

export default useFormSubmit