import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

function FieldText(props) {
  const { error, isTouched, onChange, ...rest } = props

  const errorProps = isTouched && error && {
    error: Boolean(error),
    helperText: error
  }
  return <TextField {...rest} {...errorProps} onChange={e => onChange({ name: e.target.name, value: e.target.value })} margin="normal" />
}

FieldText.propTypes = {
  error: PropTypes.string
}

export default FieldText
