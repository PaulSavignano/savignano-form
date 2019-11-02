import React, { useContext } from 'react'
import FormContext from '../lib/FormContext'

function ViewState() {
  const {
    errors,
    initialValues,
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    isTouched,
    submitError,
    touched,
    values,
  } = useContext(FormContext)
  const state = {
    errors,
    initialValues,
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    isTouched,
    submitError,
    touched,
    values,
  }
  return (
    <pre>{JSON.stringify(state, null, 2)}</pre>
  )
}

export default ViewState