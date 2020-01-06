import React from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'

import { useFormField } from '../lib'

function TextField({
  className,
  name,
  label,
  onValidate,
  select,
  children,
}) {
  const {
    error,
    isTouched,
    onBlur,
    onChange,
    value,
  } = useFormField({ name, onValidate })
  return (
    <MuiTextField
      className={className}
      error={Boolean(isTouched && error)}
      helperText={isTouched && error ? error : ' '}
      label={label}
      margin="normal"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      select={select}
      value={value}
    >
      {children}
    </MuiTextField>
  )
}

TextField.defaultProps = {
  children: undefined,
  className: undefined,
  onValidate: undefined,
  select: false,
}

TextField.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
  select: PropTypes.bool,
}

export default TextField
