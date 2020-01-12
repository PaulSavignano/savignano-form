import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import setIn from './utils/setIn'
import getIn from './utils/getIn'
import isValue from './utils/isValue'
import handleSubmitEvent from './utils/handleSubmitEvent'
import handleInputEvent from './utils/handleInputEvent'

class FormProvider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      formProps: this.props,
      initialValues: {},
      isSubmitFailure: false,
      isSubmitSuccess: false,
      isSubmitting: false,
      isTouched: false,
      onBlur: this.handleBlurEvent,
      onChange: this.handleChangeEvent,
      onRegisterField: this.handleRegisterField,
      onReset: this.handleReset,
      onSubmit: this.handleSubmit,
      onUnregisterField: this.handleUnregisterField,
      setFormState: this.handleState,
      submitError: '',
      touched: {},
      values: {},
    }
    this.fields = {}
    this.initialFields = {}
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getOnProps = props => ({
    ...this.state,
    ...props,
    getIn,
    onBlur: this.handleOnBlur,
    onChange: this.handleOnChange,
    onError: this.handleOnError,
  })

  handleBlur = ({ name, value }) => {
    const { onValidate: formOnValidate } = this.props
    const { onBlur, onValidate } = this.fields[name]
    const error = this.handleOnValidate({ name, onValidate, value })
    this.setState(state => {
      const formErrors = formOnValidate ? formOnValidate({ ...state, errors: state.errors, getIn, setIn }) : state.errors
      const errors = setIn(formErrors, name, error)
      return {
        isTouched: true,
        touched: setIn(state.touched, name, true),
        errors,
      }
    })
    if (onBlur) {
      return onBlur(this.getOnProps({ name, value }))
    }
    return undefined
  }

  handleBlurEvent = e => {
    const { name, value } = handleInputEvent(e)
    this.handleBlur({ name, value })
  }

  handleChange = ({ name, value }) => {
    const { onValidate: formOnValidate } = this.props
    const { onChange, onParse, onValidate } = this.fields[name]
    const parsedValue = this.handleOnParse({ name, onParse, value })
    const error = this.handleOnValidate({ name, onValidate, value })
    this.setState((state) => {
      const values = setIn(state.values, name, parsedValue)
      const formErrors = formOnValidate ? formOnValidate({ ...state, errors: state.errors, getIn, setIn }) : state.errors
      const errors = setIn(formErrors, name, error)
      return {
        errors,
        isTouched: true,
        submitError: '',
        ...typeof value === 'boolean' && { touched: setIn(state.touched, name, true) },
        values,
      }
    })
    if (onChange) {
      return onChange(this.getOnProps({ name, value }))
    }
    return undefined
  }

  handleChangeEvent = (e) => {
    const { name, value, checked } = handleInputEvent(e)
    const { type } = this.fields[name]
    const isCheckbox = /checkbox/.test(type)
    return this.handleChange({ name, value: isCheckbox ? checked : value })
  }

  handleOnBlur = ({ name }) => this.setState(state => ({
    isTouched: true,
    touched: setIn(state.touched, name, true),
  }))

  handleOnChange = ({ name, value }) => this.setState(state => ({
    values: setIn(state.values, name, value),
  }))

  handleOnError = ({ name, error }) => this.setState(state => ({
    errors: setIn(state.errors, name, error),
  }))

  handleOnParse = ({ name, onParse, value }) => {
    if (onParse) {
      return onParse(this.getOnProps({ name, value }))
    }
    return value
  }

  handleOnValidate = ({ name, onValidate, value }) => {
    if (!onValidate) return undefined
    if (Array.isArray(onValidate)) {
      const error = onValidate.reduce((a, v) => {
        const e = v(this.getOnProps({ name, value }))
        if (e) {
          a = e
        }
        return a
      }, undefined)
      return error
    }
    return onValidate(this.getOnProps({ name, value }))
  }

  handleRegisterField = ({ name, ...rest }) => {
    if (this.fields[name]) return undefined

    const { isTouched } = this.state
    this.fields[name] = rest
    if (!isTouched && !this.initialFields[name]) {
      this.initialFields[name] = rest
    }
    const { defaultValues, initialValues } = this.props
    const isArrayField = /[.[\]]+/.test(name)
    const value = (isTouched && isArrayField) ? undefined : (getIn(initialValues, name) || getIn(defaultValues, name))
    if (isValue(value)) {
      return this.setState(state => ({
        initialValues: setIn(state.initialValues, name, value),
        values: setIn(state.values, name, value),
      }))
    }
    return undefined
  }

  handleUnregisterField = ({ name }) => {
    const { isTouched } = this.state
    this.setState(state => ({
      errors: setIn(state.errors, name, undefined),
      touched: setIn(state.touched, name, undefined),
      values: setIn(state.values, name, undefined),
    }))
    if (!isTouched) {
      delete this.initialFields[name]
    }
    delete this.fields[name]
  }

  handleReset = (names) => {
    if (names && names.length) {
      return this.setState(state => {
        const nextState = names.reduce((a, name) => {
          const value = this.handleResetValue(name)
          a.errors = setIn(a.errors, name, undefined)
          a.initialValues = setIn(a.initialValues, name, value)
          a.touched = setIn(a.touched, name, undefined)
          a.values = setIn(a.values, name, value)
          a.isTouched = Boolean(Object.keys(a.touched).length)
          return a
        }, { ...state })
        return nextState
      })
    }
    return this.setState(state => {
      const nextState = Object.keys(this.initialFields).reduce((a, name) => {
        const initialValue = this.handleResetValue(name)
        const value = this.handleResetValue(name)
        a.errors = setIn(a.errors, name, undefined)
        a.initialValues = setIn(a.initialValues, name, initialValue)
        a.touched = setIn(a.touched, name, undefined)
        a.values = setIn(a.values, name, value)
        return a
      }, {})
      return {
        ...state,
        ...nextState,
        isSubmitFailure: false,
        isSubmitSuccess: false,
        isSubmitting: false,
        isTouched: false,
        submitError: '',
      }
    })
  }

  handleResetValue = (name) => {
    const initialValue = getIn(this.props.initialValues, name)
    const defaultValue = getIn(this.props.defaultValues, name)
    if (isValue(initialValue)) return initialValue
    if (isValue(defaultValue)) return defaultValue
    return undefined
  }

  handleState = state => {
    return this.setState(state)
  }

  handleSubmitValidations = () => {
    const validationState = Object.keys(this.fields).reduce((a, name) => {
      const { onValidate } = this.fields[name]
      const error = onValidate
        && this.handleOnValidate({
          name,
          value: getIn(this.state.values, name),
          onValidate,
        })
      a.touched = setIn(a.touched, name, true)
      if (error) {
        a.errors = setIn(a.errors, name, error)
      }
      return a
    }, {})
    return validationState
  }

  handleSubmit = (e) => {
    const { onSubmit: onSubmitProp } = this.props
    const fn = onSubmitProp || e
    handleSubmitEvent(e)
    this.setState({ isSubmitting: true, isTouched: true })
    const validationState = this.handleSubmitValidations()
    if (validationState.errors && Object.keys(validationState.errors).length) {
      return this.setState({ ...validationState, isSubmitting: false, isSubmitFailure: true })
    }
    return fn(this.state.values)
      .then((res) => {
        if (this.mounted) {
          this.setState({ isSubmitSuccess: true, isSubmitting: false })
          this.handleReset()
        }
        return Promise.resolve(res)
      })
      .catch((error) => {
        if (this.mounted) this.setState({ isSubmitting: false, submitError: error })
      })
  }

  render() {
    const { children } = this.props
    return (
      <FormContext.Provider value={this.state}>
        {children}
      </FormContext.Provider>
    )
  }
}

FormProvider.defaultProps = {
  defaultValues: {},
  initialValues: {},
  onSubmit: undefined,
  onValidate: undefined,
}

FormProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  defaultValues: PropTypes.shape(Object),
  initialValues: PropTypes.shape(Object),
  onSubmit: PropTypes.func,
  onValidate: PropTypes.func,
}

export default FormProvider
