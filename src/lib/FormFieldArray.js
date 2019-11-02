import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import getIn from './utils/getIn'
import setIn from './utils/setIn'

export function getValueArray(value) {
  if (value && value.length) {
    return value.map((v, i) => i)
  }
  return []
}

export function getInitialValueArray({ name, values, initialValues, defaultValues }) {
  const value = getIn(values, name)
  if (value) return getValueArray(value)
  const initialValue = getIn(initialValues, name)
  if (initialValue) return getValueArray(initialValue)
  const defaultValue = getIn(defaultValues, name)
  if (defaultValue) return getValueArray(defaultValue)
  return []
}

export function getFiltered({ index, value }) {
  if (value && value.length) {
    return value.filter((v, i) => i !== index)
  }
  return undefined
}

function FormFieldArray({ name, component: Component, ...rest }) {
  const { onState, values, formProps } = useContext(FormContext)
  const value = getIn(values, name) || []
  const [valueArray, setValueArray] = useState(getInitialValueArray({ name, values, initialValues: formProps.initialValues, defaultValues: formProps.defaultValues }))
  return (
    <Component
      {...rest}
      name={name}
      onAdd={() => {
        return setValueArray([...valueArray, valueArray.length])
      }}
      onDelete={(index) => {
        const filtered = getFiltered({ index, value })
        onState({ values: setIn(values, name, filtered) })
        return setValueArray(valueArray.filter((v, i) => i !== index))
      }}
      onChange={(changedValue) => {
        const nextValues = setIn(values, name, changedValue)
        const nextValueArray = getValueArray(changedValue)
        onState({ values: nextValues })
        return setValueArray(nextValueArray)
      }}
      value={valueArray}
    />
  )
}

FormFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FormFieldArray
