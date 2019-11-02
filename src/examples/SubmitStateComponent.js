import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error'

function FormSubmitStateComponent({
  children,
  isSubmitting,
  isSubmitSuccess,
  isSubmitError
}) {
  const [isSuccessIcon, setIsSuccessIcon] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  useEffect(() => {
    if (isSubmitSuccess) {
      const nextTimeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        setTimeoutId(null)
        setIsSuccessIcon(false)
      }, 3000)
      setTimeoutId(nextTimeoutId)
      setIsSuccessIcon(true)
    }
    return () => timeoutId && clearTimeout(timeoutId)
  }, [isSubmitSuccess, timeoutId])
  switch (true) {
    case isSuccessIcon:
      return <CheckIcon />
    case isSubmitting:
      return <CircularProgress size={24} style={{ color: 'inherit' }} />
    case isSubmitError:
      return <ErrorIcon />
    default:
      return children
  }
}

FormSubmitStateComponent.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  isSubmitSuccess: PropTypes.bool.isRequired,
  isSubmitError: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default FormSubmitStateComponent