import React from 'react'
import { shallow } from 'enzyme'

import FormProvider from './FormProvider'
import getIn from './utils/getIn'

const testFields = {
  email: {
    name: 'email',
    type: 'text',
  },
}


const testProps = {
  children: <div />,
  defaultValues: {},
  initialValues: {},
  onSubmit: jest.fn(() => Promise.resolve({})),
}

const testState = {
  errors: {},
  formProps: {},
  initialValues: {},
  isErrors: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  isTouched: false,
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onReset: jest.fn(),
  onSubmit: jest.fn(),
  onUnregisterField: jest.fn(),
  setFormState: jest.fn(),
  submitError: '',
  touched: {},
  values: {},
}


describe('FormProvider', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should set state values to initialValues prop if provided', () => {
      const initialValues = { email: 'initialValues@test.com' }
      const wrapper = shallow(<FormProvider {...testProps} initialValues={initialValues} />)
      wrapper.instance().handleRegisterField(testFields.email)
      expect(wrapper.state().initialValues).toEqual(initialValues)
      expect(wrapper.state().values).toEqual(initialValues)
    })

    it('should set state values to empty object if no initialValues prop is present', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      expect(wrapper.state().values).toEqual({})
    })

    it('should set this.mounted to false when component unmounts', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().componentWillUnmount()
      expect(wrapper.instance().mounted).toEqual(false)
    })
  })

  describe('handleBlur', () => {
    it('should call onBlur field prop is provided and pass form state and methods', () => {
      const name = 'email'
      const value = 'onBlur@test.com'
      const spy = jest.fn()
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField({ ...testFields.email, onBlur: spy })
      wrapper.instance().handleBlur({ name, value })
      expect(spy).toHaveBeenCalledWith({
        ...wrapper.instance().state,
        getIn,
        name,
        onBlur: wrapper.instance().handleOnBlur,
        onChange: wrapper.instance().handleOnChange,
        onError: wrapper.instance().handleOnError,
        value,
      })
    })
  })

  describe('handleBlurEvent', () => {
    it('should call when field input prop is called', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.state().onRegisterField(testFields.email)
      const spy = jest.spyOn(wrapper.instance(), 'handleBlur')
      const target = {
        name: 'email'
      }
      const e = {
        preventDefault: jest.fn(),
        target,
      }
      wrapper.instance().forceUpdate()
      wrapper.props().value.onBlur(e)
      expect(spy).toHaveBeenCalledWith(target)
    })
  })

  describe('handleChange', () => {
    it('should call forms onValidate prop with form state', () => {
      const name = 'email'
      const value = 'formOnValidate@test.com'
      const spy = jest.fn(arg => arg.errors)
      const wrapper = shallow(<FormProvider {...testProps} onValidate={spy} />)
      wrapper.props().value.onRegisterField(testFields.email)
      wrapper.props().value.onChange({ name, value })
      const expectedArg = {
        ...wrapper.instance().state,
        isTouched: false,
        touched: {},
      }
      expect(spy).toHaveBeenCalledWith(expectedArg)
    })

    it('should parse field value if value and onParse', () => {
      const name = 'email'
      const value = 'onParse@test.com'
      const spy = jest.fn(() => value)
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField({
        ...testFields.email,
        onParse: spy,
      })
      const registeredState = wrapper.instance().state
      wrapper.instance().handleChange({ name, value })
      expect(spy).toHaveBeenCalledWith({
        ...registeredState,
        getIn,
        name,
        onBlur: wrapper.instance().handleOnBlur,
        onChange: wrapper.instance().handleOnChange,
        onError: wrapper.instance().handleOnError,
        value,
      })
    })

    it('should call handleOnValidate when field onValidate prop is present', () => {
      const name = 'email'
      const value = 'handleOnValidate@test.com'
      const wrapper = shallow(<FormProvider {...testProps} />)
      const handleOnValidateSpy = jest.spyOn(wrapper.instance(), 'handleOnValidate')
      wrapper.instance().handleRegisterField(testFields.email)
      wrapper.instance().handleChange({ name, value })
      expect(handleOnValidateSpy).toHaveBeenCalledWith({
        name,
        onValidate: testFields.email.onValidate,
        value,
      })
    })

    it('should call onChange field prop if provided, and pass form state and methods', () => {
      const spy = jest.fn()
      const name = 'email'
      const value = 'test-onchange-field-prop@test.com'
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField({ ...testFields.email, onChange: spy })
      wrapper.instance().handleChange({ name, value })
      expect(spy).toHaveBeenCalledWith({
        ...wrapper.instance().state,
        getIn,
        name,
        onBlur: wrapper.instance().handleOnBlur,
        onChange: wrapper.instance().handleOnChange,
        onError: wrapper.instance().handleOnError,
        value,
      })
    })
  })

  describe('handleChangeEvent', () => {
    it('should call method when context value is called', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.state().onRegisterField(testFields.email)
      const spy = jest.spyOn(wrapper.instance(), 'handleChange')
      const target = {
        name: 'email',
        value: 'test@test.com',
      }
      const e = {
        preventDefault: jest.fn(),
        target,
      }
      wrapper.instance().forceUpdate()
      wrapper.props().value.onChange(e)
      expect(spy).toHaveBeenCalledWith(target)
    })

    it('should call handleChange if native', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField(testFields.email)
      const spy = jest.spyOn(wrapper.instance(), 'handleChange')
      const e = {
        name: 'email',
        value: 'test@test.com',
      }
      wrapper.instance().forceUpdate()
      wrapper.props().value.onChange(e)
      expect(spy).toHaveBeenCalledWith(e)
    })

    it('should handle checkbox field by setting value to target.checked', () => {
      const name = 'isEmail'
      const wrapper = shallow(<FormProvider {...testProps} />)
      const spy = jest.spyOn(wrapper.instance(), 'handleChange')
      wrapper.instance().forceUpdate()
      wrapper.instance().handleRegisterField({ name, type: 'checkbox' })
      wrapper.instance().handleChangeEvent({
        preventDefault: jest.fn(),
        target: { name, checked: true },
      })
      expect(spy).toHaveBeenCalledWith({ name, value: true })
    })
  })

  describe('handleOnBlur', () => {
    it('should call from a fields onBlur prop', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      const spy = jest.spyOn(wrapper.instance(), 'handleOnBlur')
      wrapper.instance().handleRegisterField({ ...testFields.email, onBlur: spy })
      wrapper
        .instance()
        .getOnProps()
        .onBlur({ name: testFields.email.name })
      expect(spy).toHaveBeenCalledWith({ name: testFields.email.name })
    })
    it('should set field as touched in state', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField(testFields.email)
      wrapper.instance().handleOnBlur({ name: testFields.email.name })
      expect(wrapper.state().isTouched).toEqual(true)
      expect(wrapper.state().touched[testFields.email.name]).toEqual(true)
    })
  })

  describe('handleOnChange', () => {
    it('should call from a fields onChange prop', () => {
      const value = 'handleOnChange@test.com'
      const wrapper = shallow(<FormProvider {...testProps} />)
      const spy = jest.spyOn(wrapper.instance(), 'handleOnChange')
      wrapper.instance().handleRegisterField({ ...testFields.email, onChange: spy })
      wrapper
        .instance()
        .getOnProps()
        .onChange({ name: testFields.email.name, value })
      expect(spy).toHaveBeenCalledWith({ name: testFields.email.name, value })
    })
    it('should set field value in state', () => {
      const value = 'handleOnChange@test.com'
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField(testFields.email)
      wrapper.instance().handleOnChange({ name: testFields.email.name, value })
      expect(wrapper.state().values[testFields.email.name]).toEqual(value)
    })
  })

  describe('handleOnError', () => {
    it('should call from getOnProps', () => {
      const error = 'you returned an error for this field'
      const wrapper = shallow(<FormProvider {...testProps} />)
      const spy = jest.spyOn(wrapper.instance(), 'handleOnError')
      wrapper.instance().handleRegisterField({ ...testFields.email, onChange: jest.fn() })
      wrapper
        .instance()
        .getOnProps()
        .onError({ name: testFields.email.name, error })
      expect(spy).toHaveBeenCalledWith({ name: testFields.email.name, error })
    })
    it('should set field value in state', () => {
      const error = 'you returned an error again for this field'
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField(testFields.email)
      wrapper.instance().handleOnError({ name: testFields.email.name, error })
      expect(wrapper.state().errors[testFields.email.name]).toEqual(error)
    })
  })

  describe('handleOnValidate', () => {
    it('should return undefined if field onValidate prop is not present ', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField({ ...testFields.email, onValidate: undefined })
      expect(
        wrapper.instance().handleOnValidate({ name: 'email', value: 'test@gmail.com' }),
      ).toBeUndefined()
    })

    it('should call testFields onValidate prop', () => {
      const onValidate = () => 'invalid'
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField({ ...testFields.email, onValidate })
      wrapper.instance().handleChange({ name: 'email', value: 'validate@test.com' })
      expect(wrapper.state().errors).toEqual({ email: 'invalid' })
    })

    it('should iterate an array of onValidate functions if passed an array', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      const spy = jest.fn()
      wrapper.instance().handleRegisterField({ ...testFields.email, onValidate: [spy, spy] })
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('handleRegisterField', () => {
    it('should call when field prop is called', () => {
      const spy = jest.fn()
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.state().onRegisterField = spy
      wrapper.props().value.onRegisterField(testFields.email)
      expect(spy).toHaveBeenCalledWith(testFields.email)
    })

    it('should register field', () => {
      const field = { name: 'firstName', type: 'text' }
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().handleRegisterField(field)
      expect(wrapper.instance().initialFields).toEqual({ [field.name]: { type: field.type } })
      expect(wrapper.instance().fields).toEqual({ [field.name]: { type: field.type } })
    })

    it('should return if field already has a value is state', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().fields = { ...testFields }
      wrapper.instance().initialFields = { ...testFields }
      wrapper.setState({ values: { email: 'testing@test.com' } })
      expect(
        wrapper.instance().handleRegisterField({ name: 'email', comp: testFields.email }),
      ).toEqual()
    })

    it('should set field value in state if present in initialValues', () => {
      const initialValues = {
        ...testProps.initialValues,
        email: 'testing@test.com',
      }
      const wrapper = shallow(<FormProvider {...testProps} initialValues={initialValues} />)
      wrapper.setState({ values: {}, isTouched: true })
      wrapper.instance().handleRegisterField({ name: 'email', comp: testFields.email })
      expect(wrapper.instance().state.values).toEqual(initialValues)
    })

    it('should set field value to props.defaultValue value when not present in state or initialValues', () => {
      const defaultValues = { email: 'default@test.com' }
      const wrapper = shallow(<FormProvider {...testProps} defaultValues={defaultValues} />)
      wrapper.instance().handleRegisterField(testFields.email)
      expect(wrapper.instance().state.values.email).toEqual(defaultValues.email)
    })
  })

  describe('handleUnregisterField', () => {
    it('should call when context value is called', () => {
      const spy = jest.fn()
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.state().onUnregisterField = spy
      wrapper.props().value.onUnregisterField({ name: 'email' })
      expect(spy).toHaveBeenCalledWith({ name: 'email' })
    })

    it('should remove field value from state and field from this.testFields', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().fields = { ...testFields }
      wrapper.setState({ values: { email: 'test@test.com' } })
      wrapper.instance().handleUnregisterField({ name: 'email' })
      expect(wrapper.instance().state.values).toEqual({})
      expect(wrapper.instance().fields).toEqual({})
    })
  })

  describe('handleReset', () => {
    it('should call when field prop is called', () => {
      const handleResetSpy = jest.fn()
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.state().onReset = handleResetSpy
      wrapper.props().value.onRegisterField(testFields.email)
      const names = ['email']
      wrapper.props().value.onReset(names)
      expect(handleResetSpy).toHaveBeenCalledWith(names)
    })

    describe('names arg provided', () => {
      it('should reset to initialValues', () => {
        const testFields = {
          email1: { name: 'email1', type: 'text' },
          email2: { name: 'email2', type: 'text' },
          email3: { name: 'email3', type: 'text' },
        }
        const initialValues = {
          email1: 'initial1@test.com',
          email2: 'initial2@test.com',
          email3: 'initial3@test.com',
        }
        const expectedValues = {
          email1: 'initial1@test.com',
          email2: 'initial2@test.com',
          email3: 'changed3@test.com',
        }
        const wrapper = shallow(<FormProvider {...testProps} initialValues={initialValues} />)
        Object.keys(testFields).forEach(f => wrapper.instance().handleRegisterField(testFields[f]))
        Object.keys(testFields).forEach((f, i) => wrapper.instance().handleChange({ name: f, value: `changed${i + 1}@test.com` }))
        wrapper.instance().handleReset(['email1', 'email2'])
        expect(wrapper.state()).toEqual({
          ...wrapper.state(),
          initialValues,
          isTouched: wrapper.state().isTouched,
          values: expectedValues,
        })
      })

      it('should reset to defaultValues', () => {
        const testFields = {
          email1: { name: 'email1', type: 'text' },
          email2: { name: 'email2', type: 'text' },
          email3: { name: 'email3', type: 'text' },
        }
        const defaultValues = {
          email1: 'default1@test.com',
          email2: 'default2@test.com',
          email3: 'default3@test.com',
        }
        const expectedValues = {
          email1: 'default1@test.com',
          email2: 'default2@test.com',
          email3: 'changed3@test.com',
        }
        const wrapper = shallow(<FormProvider {...testProps} defaultValues={defaultValues} />)
        Object.keys(testFields).forEach(f => wrapper.instance().handleRegisterField(testFields[f]))
        Object.keys(testFields).forEach((f, i) => wrapper.instance().handleChange({ name: f, value: `changed${i + 1}@test.com` }))
        wrapper.instance().handleReset(['email1', 'email2'])
        expect(wrapper.state()).toEqual({
          ...wrapper.state(),
          initialValues: defaultValues,
          isTouched: wrapper.state().isTouched,
          values: expectedValues,
        })
      })
    })

    describe('names arg NOT provided', () => {
      it('should reset to props.initialValues', () => {
        const testFields = {
          email1: { name: 'email1', type: 'text' },
          email2: { name: 'email2', type: 'text' },
          email3: { name: 'email3', type: 'text' },
        }
        const initialValues = {
          email1: 'initial1@test.com',
          email2: 'initial2@test.com',
          email3: 'initial3@test.com',
        }
        const wrapper = shallow(<FormProvider {...testProps} initialValues={initialValues} />)
        Object.keys(testFields).forEach(f => wrapper.instance().handleRegisterField(testFields[f]))
        Object.keys(testFields).forEach((f, i) => wrapper.instance().handleChange({ name: f, value: `changed${i + 1}@test.com` }))
        wrapper.instance().handleReset()
        expect(wrapper.state()).toEqual({
          ...wrapper.state(),
          initialValues,
          isTouched: false,
          values: initialValues,
        })
      })

      it('should reset to props.defaultValues', () => {
        const testFields = {
          email1: { name: 'email1', type: 'text' },
          email2: { name: 'email2', type: 'text' },
          email3: { name: 'email3', type: 'text' },
        }
        const defaultValues = {
          email1: 'default1@test.com',
          email2: 'default2@test.com',
          email3: 'default3@test.com',
        }
        const wrapper = shallow(<FormProvider {...testProps} defaultValues={defaultValues} />)
        Object.keys(testFields).forEach(f => wrapper.instance().handleRegisterField(testFields[f]))
        Object.keys(testFields).forEach((f, i) => wrapper.instance().handleChange({ name: f, value: `changed${i + 1}@test.com` }))
        wrapper.instance().handleReset()
        expect(wrapper.state()).toEqual({
          ...wrapper.state(),
          initialValues: defaultValues,
          isTouched: false,
          values: defaultValues,
        })
      })


    })
  })

  describe('handleResetValue', () => {
    it('should return undefined if NO initialValues or defaultValues prop', () => {
      const name = 'email'
      const wrapper = shallow(<FormProvider {...testProps} />)
      expect(wrapper.instance().handleResetValue(name)).toEqual(undefined)
    })
  })

  describe('handleState', () => {
    it('should call from context prop', () => {
      const nextState = { values: {} }
      const setStateSpy = jest.spyOn(FormProvider.prototype, 'setState')
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().fields = { ...testFields }
      wrapper.props().value.setFormState(nextState)
      expect(setStateSpy).toHaveBeenCalledWith(nextState)
    })
  })

  describe('handleSubmitValidations', () => {
    it('should call from handleSubmit', () => {
      const initialValues = { email: 'submit@test.com' }
      const wrapper = shallow(<FormProvider {...testProps} initialValues={initialValues} />)
      wrapper.instance().fields = { ...testFields }
      const spy = jest.spyOn(wrapper.instance(), 'handleSubmitValidations')
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() })
      expect(spy).toHaveBeenCalled()
    })
    it('should validate fields and set touched', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().fields = { ...testFields }
      const mockHandleOnValidate = jest.fn(() => undefined)
      wrapper.instance().handleOnValidate = mockHandleOnValidate
      expect(wrapper.instance().handleSubmitValidations()).toEqual({
        touched: { email: true },
      })
    })
    it('should validate fields and set touched and error if validation fails', () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().fields = {
        ...testFields,
        email: { ...testFields.email, onValidate: jest.fn() },
      }
      const mockHandleOnValidate = jest.fn(() => 'Invalid')
      wrapper.instance().handleOnValidate = mockHandleOnValidate
      expect(wrapper.instance().handleSubmitValidations()).toEqual({
        touched: { email: true },
        errors: { email: 'Invalid' },
      })
    })
  })

  describe('handleSubmit', () => {
    it('should call from child', () => {
      const onSubmitSpy = jest.fn(() => Promise.resolve({}))
      const wrapper = shallow(<FormProvider {...testProps} onSubmit={onSubmitSpy} />)
      const e = { preventDefault: jest.fn() }
      wrapper.props().value.onSubmit(e)
      expect(onSubmitSpy).toHaveBeenCalled()
    })

    it('should call with fn arg when onSubmit prop is NOT provided', () => {
      const spy = jest.fn(() => Promise.resolve({}))
      const wrapper = shallow(<FormProvider {...testProps} onSubmit={undefined} />)
      wrapper.props().value.onSubmit(spy)
      expect(spy).toHaveBeenCalled()
    })

    it('should not call onSubmit prop and set error in state if validation error', () => {
      const onSubmitSpy = jest.fn()
      const wrapper = shallow(<FormProvider {...testProps} onSubmit={onSubmitSpy} />)
      const validationErrors = {
        touched: { email: true },
        errors: { email: 'Invalid' },
        isErrors: true,
      }
      wrapper.instance().fields = { ...testFields }
      jest.spyOn(wrapper.instance(), 'handleSubmitValidations').mockImplementation(() => validationErrors)
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() })
      expect(onSubmitSpy).not.toHaveBeenCalled()
      expect(wrapper.instance().state).toEqual({
        ...wrapper.instance().state,
        ...validationErrors
      })
    })
    it('should not setState is not mounted', async () => {
      const wrapper = shallow(<FormProvider {...testProps} />)
      wrapper.instance().fields = { ...testFields }
      wrapper.instance().mounted = false
      await wrapper.instance().handleSubmit({ preventDefault: jest.fn() })
      expect(wrapper.instance().state.isSubmitting).toEqual(true)
    })
    it('should resolve with res is successful', async () => {
      const initialValues = { email: 'res@test.com' }
      const wrapper = shallow(
        <FormProvider
          {...testProps}
          onSubmit={jest.fn(res => Promise.resolve(res))}
          initialValues={initialValues}
        />,
      )
      wrapper.instance().mounted = true
      wrapper.instance().handleRegisterField(testFields.email)
      const res = await wrapper.instance().handleSubmit({ preventDefault: jest.fn() })
      expect(res).toEqual(initialValues)
    })
    it('should catch error and set state with unsuccessful req', async () => {
      const error = 'you failed :('
      const wrapper = shallow(
        <FormProvider
          {...testProps}
          onSubmit={jest.fn(() => Promise.reject(error))}
        />,
      )
      wrapper.instance().handleRegisterField(testFields.email)
      try {
        await wrapper.instance().handleSubmit({ preventDefault: jest.fn() })
      } catch (err) {
        expect(err).toEqual(error)
        expect(wrapper.instance().state).toEqual({
          ...testState,
          isSubmitting: false,
          submitError: error,
        })
      }
    })
    it('should catch error and not set state if not mounted', async () => {
      const error = 'you failed :('
      const wrapper = shallow(
        <FormProvider
          {...testProps}
          onSubmit={jest.fn(() => Promise.reject(error))}
        />
      )
      wrapper.instance().fields = { ...testFields }
      wrapper.instance().handleRegisterField(testFields.email)
      wrapper.instance().mounted = false
      try {
        await wrapper.instance().handleSubmit({ preventDefault: jest.fn() })
      } catch (err) {
        expect(err).toEqual(error)
        expect(wrapper.instance().state).toEqual({
          ...testState,
          isSubmitting: true,
        })
      }
    })

  })
})
