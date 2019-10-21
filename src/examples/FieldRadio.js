import React from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

function FieldRadio(props) {
  const { error, isTouched, label, onBlur, value, ...rest } = props
  return (
    <FormControlLabel
      control={<Radio {...rest} aria-label={label} value={value} />}
      label={label}
      labelPlacement="start"
      value={value}
    />
  )
}

FieldRadio.propTypes = {
  className: PropTypes.string
}

export default FieldRadio
