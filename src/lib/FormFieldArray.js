import React from 'react'
import PropTypes from 'prop-types'

import useFormFieldArray from './useFormFieldArray'

function FormFieldArray({ name, component: Component, ...rest }) {
  const {
    onAdd,
    onChange,
    onDelete,
    value,
  } = useFormFieldArray({ name })
  return (
    <Component
      {...rest}
      name={name}
      onAdd={onAdd}
      onDelete={onDelete}
      onChange={onChange}
      value={value}
    />
  )
}

FormFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string]).isRequired,
}

export default FormFieldArray
