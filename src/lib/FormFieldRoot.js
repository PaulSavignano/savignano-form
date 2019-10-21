import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class FormFieldRootComponent extends PureComponent {

  componentDidMount() {
    const { fieldProps, onRegisterField } = this.props
    onRegisterField(fieldProps)
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
      fieldProps,
      isPersistOnUnmount,
      onFormat,
      onParse,
      onRegisterField,
      onUnregisterField,
      onValidate,
      value,
      ...rest
    } = this.props
    const props = {
      ...rest,
      value: onFormat ? onFormat(value) : value
    }
    return <Comp {...props} />
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
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string])
    .isRequired,
  fieldProps: PropTypes.shape({
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
