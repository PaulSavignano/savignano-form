import React from 'react'
import PropTypes from 'prop-types'

import useFormFieldArray from './useFormFieldArray'

function FormFieldArray({ name, component: Component, ...rest }) {
  const {
    onPush,
    onPop,
    onShift,
    onUnshift,
    onDelete,
    onChange,
    values,
  } = useFormFieldArray({ name })
  return (
    <Component
      {...rest}
      name={name}
      onPush={onPush}
      onPop={onPop}
      onShift={onShift}
      onUnshift={onUnshift}
      onDelete={onDelete}
      onChange={onChange}
      values={values}
    />
  )
}

FormFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string]).isRequired,
}

export default FormFieldArray
