import { useContext, useMemo } from 'react'

import FormContext from './FormContext'

export function isDisabled({
  isErrors,
  isSubmitError,
  isSubmitting,
  isTouched,
}) {
  if (isSubmitting) return true
  if (isTouched && (isErrors || isSubmitError)) return true
  return false
}

const useFormSubmit = () => {
  const {
    errors,
    isSubmitSuccess,
    isSubmitting,
    isTouched,
    onSubmit,
    submitError
  } = useContext(FormContext)
  return useMemo(() => {
    const isErrors = Boolean(Object.keys(errors).length)
    const isSubmitError = Boolean(submitError)
    return {
      isDisabled: isDisabled({ isErrors, isSubmitError, isSubmitting, isTouched }),
      isErrors,
      isSubmitError,
      isSubmitSuccess,
      isSubmitting,
      onSubmit,
      submitError
    }
  }, [errors, isSubmitSuccess, isSubmitting, isTouched, onSubmit, submitError])
}

export default useFormSubmit