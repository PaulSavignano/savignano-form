import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'

function FieldCheckbox(props) {
  const { error, isTouched, onBlur, value, ...rest } = props
  return <Checkbox {...rest} />
}

FieldCheckbox.propTypes = {
  error: PropTypes.object
}

export default FieldCheckbox
