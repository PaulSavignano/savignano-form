import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error'

function FormSubmitState(props) {
  const { children, isSubmitting, isSubmitSuccess, isSubmitError } = props
  switch (true) {
    case isSubmitting:
      return <CircularProgress size={24} style={{ color: 'inherit' }} />
    case isSubmitSuccess:
      return children
    case isSubmitError:
      return <span className="form-validate-icon normal vxdsicon vxdsicon-error" />
    default:
      return children
  }
}

FormSubmitState.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  isSubmitSuccess: PropTypes.bool.isRequired,
  isSubmitError: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default FormSubmitState
