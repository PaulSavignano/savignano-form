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
    const { onBlur } = this.fields[name]
    this.setState(state => ({
      isTouched: true,
      touched: setIn(state.touched, name, true),
    }))
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
      const errors = setIn(state.errors, name, error)
      const errorsToSet = formOnValidate ? formOnValidate({ ...state, errors, values }) : errors
      return {
        errors: errorsToSet,
        isTouched: true,
        submitError: '',
        touched: setIn(state.touched, name, true),
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
      return onValidate.reduce((a, v) => {
        let error = a
        error = v(this.getOnProps({ name, value }))
        return error
      }, {})
    }
    return onValidate(this.getOnProps({ name, value }))
  }

  handleRegisterField = ({ name, ...rest }) => {
    if (this.fields[name]) return undefined
    const { isTouched } = this.state
    this.fields[name] = rest
    if (isTouched) {
      const isArrayField = /[.[\]]+/.test(name)
      if (isArrayField) return undefined
    }
    if (!isTouched && !this.initialFields[name]) {
      this.initialFields[name] = rest
    }
    const { initialValues, defaultValues } = this.props
    const initialValue = getIn(initialValues, name) || getIn(defaultValues, name)
    const { onValidate } = rest
    const error = this.handleOnValidate({ name, onValidate, value: initialValue })
    if (isValue(initialValue)) {
      return this.setState(state => ({
        initialValues: setIn(state.initialValues, name, initialValue),
        values: setIn(state.values, name, initialValue),
        errors: setIn(state.errors, name, error)
      }))
    }
    if (error) {
      return this.setState(state => ({ errors: setIn(state.errors, name, error) }))
    }
    return undefined
  }

  handleUnregisterField = ({ name }) => {
    this.setState(state => ({
      errors: setIn(state.errors, name, undefined),
      touched: setIn(state.touched, name, undefined),
      values: setIn(state.values, name, undefined),
    }))
    if (!this.state.isTouched) {
      delete this.initialFields[name]
    }
    delete this.fields[name]
  }

  handleReset = (names) => {
    if (names && names.length) {
      const nextState = Object.keys(this.initialFields).reduce((a, name) => {
        const state = a
        if (names.includes(name)) {
          const value = this.handleResetValue(name)
          const { onValidate } = this.initialFields[name]
          const error = this.handleOnValidate({ name, onValidate, value })
          state.errors = setIn(state.errors, name, error)
          state.initialValues = setIn(
            state.initialValues,
            name,
            value,
          )
          state.touched = setIn(state.touched, name, undefined)
          state.values = setIn(state.values, name, value)
          return state
        }
        state.errors = setIn(state.errors, name, getIn(this.state.errors, name))
        state.initialValues = setIn(state.initialValues, name, this.handleResetValue(name))
        state.touched = setIn(state.touched, name, getIn(this.state.touched, name))
        state.values = setIn(state.values, name, getIn(this.state.values, name))
        return state
      }, {})
      return this.setState({
        ...nextState,
        isTouched: Boolean(Object.keys(nextState.touched).length),
      })
    }

    const nextState = Object.keys(this.initialFields).reduce((a, name) => {
      const state = a
      const initialValue = this.handleResetValue(name)
      const value = this.handleResetValue(name)
      const { onValidate } = this.initialFields[name]
      const error = this.handleOnValidate({ name, onValidate, value })
      state.errors = setIn(state.errors, name, error)
      state.initialValues = setIn(
        state.initialValues,
        name,
        initialValue,
      )
      state.touched = setIn(
        state.touched,
        name,
        undefined,
      )
      state.values = setIn(state.values, name, value)
      return state
    }, {})
    return this.setState({
      ...nextState,
      isSubmitSuccess: false,
      isSubmitting: false,
      isTouched: Boolean(Object.keys(nextState.touched).length),
      submitError: '',
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
      return this.setState({ ...validationState, isSubmitting: false })
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
