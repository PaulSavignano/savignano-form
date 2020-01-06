import React from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiCheckbox from '@material-ui/core/Checkbox'

import { useFormField } from '../lib'

function Checkbox({
  className,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onValidate,
}) {
  const {
    onChange,
    checked,
  } = useFormField({
    name,
    onBlur: onBlurCallback,
    onChange: onChangeCallback,
    onValidate,
    type: 'checkbox',
  })
  return (
    <FormControlLabel
      className={className}
      control={(
        <MuiCheckbox
          name={name}
          onChange={onChange}
          checked={checked}
        />
      )}
      label={label}
    />

  )
}

Checkbox.defaultProps = {
  className: undefined,
  onBlur: undefined,
  onChange: undefined,
  onValidate: undefined,
}

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
}

export default Checkbox
