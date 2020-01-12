import { useContext, useMemo } from 'react'

import FormContext from './FormContext'

export function isDisabled({
  isErrors,
  isSubmitError,
  isSubmitFailure,
  isSubmitting,
  isTouched,
}) {
  if (isSubmitting) return true
  if (isSubmitFailure && (isErrors || isSubmitError)) return true
  if (isTouched && isErrors) return true
  return false
}

const useFormSubmit = () => {
  const {
    errors,
    isSubmitFailure,
    isSubmitSuccess,
    isSubmitting,
    touched,
    onSubmit,
    submitError
  } = useContext(FormContext)
  const isErrors = Boolean(Object.keys(errors).length)
  const isTouched = Boolean(Object.keys(touched).length)
  const isSubmitError = Boolean(submitError)
  return useMemo(() => {
    return {
      isDisabled: isDisabled({ isErrors, isSubmitError, isSubmitting, isSubmitFailure, isTouched }),
      isErrors,
      isSubmitError,
      isSubmitSuccess,
      isSubmitting,
      onSubmit,
      submitError
    }
  }, [isErrors, isSubmitError, isSubmitFailure, isSubmitSuccess, isSubmitting, isTouched, onSubmit, submitError])
}

export default useFormSubmit