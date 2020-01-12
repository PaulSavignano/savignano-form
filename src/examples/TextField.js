import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import MuiTextField from '@material-ui/core/TextField'

import { useFormField } from '../lib'

function TextField({
  InputProps,
  SelectProps,
  children,
  className,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate,
  select,
  style,
}) {
  const {
    error,
    isTouched,
    onBlur,
    onChange,
    value,
  } = useFormField({
    name,
    onBlur: onBlurCallback,
    onChange: onChangeCallback,
    onFormat,
    onParse,
    onValidate,
    type: 'text',
  })
  return useMemo(() => {
    return (
      <MuiTextField
        InputProps={InputProps}
        SelectProps={SelectProps}
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
        style={style}
      >
        {children}
      </MuiTextField>
    )
  }, [InputProps, SelectProps, children, className, error, isTouched, label, name, onBlur, onChange, select, style, value])
}

TextField.defaultProps = {
  SelectProps: undefined,
  children: undefined,
  className: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  select: false,
  style: undefined,
}

TextField.propTypes = {
  SelectProps: PropTypes.instanceOf(Object),
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFormat: PropTypes.func,
  onParse: PropTypes.func,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
  select: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
}

export default TextField
