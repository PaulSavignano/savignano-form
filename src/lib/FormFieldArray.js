import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import getIn from './utils/getIn'
import FormFieldArrayRoot from './FormFieldArrayRoot'

function FormFieldArray({ name, ...rest }) {
  return (
    <Context.Consumer>
      {({ onState, values }) => {
        const value = getIn(values, name)
        return (
          <FormFieldArrayRoot
            {...rest}
            name={name}
            onState={onState}
            values={values}
            value={value}
          />
        )
      }}
    </Context.Consumer>
  )
}

FormFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FormFieldArray
