import { useContext, useMemo } from 'react'

import FormContext from './FormContext'

export function isDisabled({
  isErrors,
  isSubmitError,
  isSubmitting,
  isSubmitFailure,
}) {
  if (isSubmitting) return true
  if (isSubmitFailure && (isErrors || isSubmitError)) return true
  return false
}

const useFormSubmit = () => {
  const {
    errors,
    isSubmitFailure,
    isSubmitSuccess,
    isSubmitting,
    onSubmit,
    submitError
  } = useContext(FormContext)
  return useMemo(() => {
    const isErrors = Boolean(Object.keys(errors).length)
    const isSubmitError = Boolean(submitError)
    return {
      isDisabled: isDisabled({ isErrors, isSubmitError, isSubmitting, isSubmitFailure }),
      isErrors,
      isSubmitError,
      isSubmitSuccess,
      isSubmitting,
      onSubmit,
      submitError
    }
  }, [errors, isSubmitFailure, isSubmitSuccess, isSubmitting, onSubmit, submitError])
}

export default useFormSubmit