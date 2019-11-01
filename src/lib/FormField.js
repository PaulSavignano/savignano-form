import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import useFormField from './useFormField'

function FormField({
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
    const { isTouched, ...restFieldProps } = fieldProps
    const isTouchedProp = typeof Component === 'string' ? {} : { isTouched }
    return (
      <Component {...rest} {...restFieldProps} {...isTouchedProp} />
    )
  }, [
    value,
    fieldProps.value,
    fieldProps.checked,
    fieldProps.error,
    fieldProps.isTouched,
  ])
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
