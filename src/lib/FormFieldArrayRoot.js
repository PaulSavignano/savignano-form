import React, { useState } from 'react'
import PropTypes from 'prop-types'

import setIn from './utils/setIn'

function FormFieldArrayRoot({
  component: Component,
  name,
  onState,
  value,
  values,
}) {
  const [valueArray, setValueArray] = useState(value && value.length ? value.map((v, i) => i) : [])
  return (
    <Component
      name={name}
      onAdd={() => setValueArray([...valueArray, valueArray.length])}
      onDelete={(index) => {
        const filtered = value && value.length ? value.filter((v, i) => i !== index) : []
        const nextValue = filtered.length ? filtered : undefined
        onState({ values: setIn(values, name, nextValue) })
        return setValueArray(valueArray.filter((v, i) => i !== index))
      }}
      onChange={(props) => {
        const nextValues = setIn(values, name, props.value)
        return onState({ values: nextValues })
      }}
      value={valueArray}
    />
  )
}

FormFieldArrayRoot.defaultProps = {
  value: []
}

FormFieldArrayRoot.propTypes = {
  component: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onState: PropTypes.func.isRequired,
  value: PropTypes.shape(Array),
  values: PropTypes.shape(Object).isRequired,
}

export default FormFieldArrayRoot
