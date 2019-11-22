import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import useFormField from './useFormField'

export function getInputProps({ component, isTouched, label }) {
  if (typeof component === 'string') {
    return {
      'aria-label': label
    }
  }
  return {
    isTouched,
    label,
  }
}

function FormField({
  label,
  name,
  id,
  onBlur,
  onChange,
  onFormat,
  onParse,
  onValidate,
  type,
  value,
  isPersistOnUnmount,
  component: Component,
  ...rest
}) {
  const fieldProps = useFormField({
    name,
    id,
    onBlur,
    onChange,
    onFormat,
    onParse,
    onValidate,
    isPersistOnUnmount,
    type,
    value,
  })
  return useMemo(() => {
    const { isTouched, setValue, ...restFieldProps } = fieldProps
    const inputProps = getInputProps({ component: Component, label, isTouched })
    return (
      <Component {...rest} {...restFieldProps} {...inputProps} />
    )
  }, [fieldProps, Component, label, rest])
}

FormField.defaultProps = {
  id: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  type: undefined,
  value: undefined,
  isPersistOnUnmount: false
}

FormField.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFormat: PropTypes.func,
  onParse: PropTypes.func,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
}

export default FormField
