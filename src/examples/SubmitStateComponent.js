import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error'

function FormSubmitStateComponent(props) {
  const { children, isSubmitting, isSubmitSuccess, isSubmitError } = props
  switch (true) {
    case isSubmitting:
      return <CircularProgress size={24} style={{ color: 'inherit' }} />
    case isSubmitSuccess:
      return <CheckIcon />
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