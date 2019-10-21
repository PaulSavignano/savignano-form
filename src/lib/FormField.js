import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import FormFieldRoot from './FormFieldRoot'
import getIn from './utils/getIn'
import getCheckedProps from './utils/getCheckedProps'

function FormField(props) {
  const {
    id,
    name,
    onBlur,
    onChange,
    onFormat,
    onParse,
    onValidate,
    type,
    value,
  } = props
  const fieldProps = {
    id,
    name,
    onBlur,
    onChange,
    onFormat,
    onParse,
    onValidate,
    type,
    value,
  }
  return (
    <Context.Consumer>
      {ctx => {
        const stateValue = getIn(ctx.values, name)
        return (
          <FormFieldRoot
            {...props}
            {...getCheckedProps({ stateValue, type, value })}
            error={getIn(ctx.errors, name)}
            fieldProps={fieldProps}
            isTouched={Boolean(getIn(ctx.touched, name))}
            key={name}
            onBlur={ctx.onBlur}
            onChange={ctx.onChange}
            onRegisterField={ctx.onRegisterField}
            onUnregisterField={ctx.onUnregisterField}
            type={type}
            value={value || stateValue}
          />
        )
      }}
    </Context.Consumer>
  )
}

FormField.defaultProps = {
  id: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  type: undefined,
  value: undefined
}

FormField.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string])
    .isRequired,
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
