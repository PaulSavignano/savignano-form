import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiSwitch from '@material-ui/core/Switch'

import { useFormField } from '../lib'

function Switch({
  className,
  label,
  name,
  onChange: onChangeCallback,
  onBlur: onBlurCallback,
}) {
  const {
    onChange,
    value
  } = useFormField({
    name,
    type: 'checkbox',
    onChange: onChangeCallback,
    onBlur: onBlurCallback,
  })
  return (
    <FormControlLabel
      className={className}
      control={(
        <MuiSwitch
          checked={value}
          name={name}
          onChange={onChange}
        />
      )}
      label={label}
    />
  )
}

export default Switch
