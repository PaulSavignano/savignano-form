import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import getValue from './utils/getValue'

export class FormFieldRootComponent extends PureComponent {

  componentDidMount() {
    const { fieldRegisterProps, onRegisterField } = this.props
    onRegisterField(fieldRegisterProps)
  }

  componentWillUnmount() {
    const { isPersistOnUnmount, name, onUnregisterField } = this.props
    if (!isPersistOnUnmount) {
      onUnregisterField({ name })
    }
  }

  render() {
    const {
      component: Comp,
      fieldRegisterProps,
      isPersistOnUnmount,
      onFormat,
      onParse,
      onRegisterField,
      onUnregisterField,
      onValidate,
      type,
      value,
      ...rest
    } = this.props
    return (
      <Comp
        {...rest}
        value={getValue({ type, onFormat, value })}
        type={type}
      />
    )
  }
}

FormFieldRootComponent.defaultProps = {
  id: undefined,
  isPersistOnUnmount: false,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  type: 'text',
  value: undefined
}

FormFieldRootComponent.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  fieldRegisterProps: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFormat: PropTypes.func,
    onParse: PropTypes.func,
    onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
  }).isRequired,
  id: PropTypes.string,
  isPersistOnUnmount: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onFormat: PropTypes.func,
  onParse: PropTypes.func,
  onRegisterField: PropTypes.func.isRequired,
  onUnregisterField: PropTypes.func.isRequired,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
}

const Memoized = React.memo(props => <FormFieldRootComponent {...props} />)

export default Memoized
