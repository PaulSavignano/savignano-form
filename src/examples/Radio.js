import React from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiRadio from '@material-ui/core/Radio'

import { useFormField } from '../lib'

function Radio({
  className,
  isPersistOnUnmount,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onValidate,
  value: radioValue,
}) {
  const {
    checked,
    onChange,
    value,
  } = useFormField({
    isPersistOnUnmount,
    name,
    onBlur: onBlurCallback,
    onChange: onChangeCallback,
    onValidate,
    type: 'radio',
    value: radioValue,
  })
  return (
    <FormControlLabel
      className={className}
      control={(
        <MuiRadio
          checked={checked}
          inputProps={{ 'aria-label': label }}
          name={name}
          onChange={onChange}
          value={value}
        />
      )}
      label={label}
      labelPlacement="end"
    />
  )
}

Radio.defaultProps = {
  className: undefined,
  isPersistOnUnmount: false,
  onBlur: undefined,
  onChange: undefined,
  onValidate: undefined,
}

Radio.propTypes = {
  className: PropTypes.string,
  isPersistOnUnmount: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
  value: PropTypes.string.isRequired,
}

export default Radio
