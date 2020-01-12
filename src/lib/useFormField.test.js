import React from 'react'
import { mount } from 'enzyme'

import FormContext from './FormContext'
import useFormField, { getValue } from './useFormField'
import getIn from './utils/getIn'

describe('getValue', () => {
  const testProps = {
    errors: {},
    formValue: 'testing',
    onFormat: undefined,
    radioValue: undefined,
    touched: {},
    type: 'text',
    values: {},
  }
  it('should return empty string if !value and type text', () => {
    const value = getValue({
      ...testProps,
      formValue: undefined
    })
    expect(value).toEqual('')
  })
  it('should return false if !value and type checkbox', () => {
    const value = getValue({
      ...testProps,
      type: 'checkbox',
      formValue: undefined
    })
    expect(value).toEqual(false)
  })
  it('should return inputs value if radio', () => {
    const radioValue = 'firstName'
    const value = getValue({
      ...testProps,
      type: 'radio',
      radioValue
    })
    expect(value).toEqual(radioValue)
  })
  it('should return empty string if !value and NOT type checkbox or text', () => {
    const value = getValue({
      ...testProps,
      type: undefined,
      onFormat: undefined,
      formValue: undefined
    })
    expect(value).toEqual('')
  })
  it('should call onFormat if onFormat and value', () => {
    const spy = jest.fn()
    getValue({
      ...testProps,
      onFormat: spy,
    })
    expect(spy).toHaveBeenCalledWith({
      errors: testProps.errors,
      getIn,
      touched: testProps.touched,
      value: testProps.formValue,
      values: testProps.values,
    })
  })
  it('should return formValue', () => {
    const value = getValue(testProps)
    expect(value).toEqual(testProps.formValue)
  })
})


describe('useFormField', () => {
  class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
      this.props.spy(error)
    }

    render() {
      return this.props.children
    }
  }

  const testProps = {
    id: '123456',
    name: 'email',
    onBlur: undefined,
    onChange: undefined,
    onFormat: undefined,
    onParse: undefined,
    onValidate: undefined,
    type: 'text',
    value: undefined,
  }

  const testCtx = {
    error: undefined,
    isTouched: false,
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onRegisterField: jest.fn(),
    onUnregisterField: jest.fn(),
    values: { email: 'test1@testing.com' },
  }

  it('should return context', () => {
    const expected = {
      error: testCtx.error,
      isTouched: testCtx.isTouched,
      name: testProps.name,
      onBlur: testCtx.onBlur,
      onChange: testCtx.onChange,
      type: testProps.type,
      value: 'test1@testing.com',
    }
    const MyFormField = (props) => {
      const fieldProps = useFormField(props)
      expect(fieldProps).toEqual(expected)
      return <div />
    }
    mount(
      <FormContext.Provider value={testCtx}>
        <MyFormField {...testProps} />
      </FormContext.Provider>
    )
  })

  it('should throw is name is not provided', () => {
    const errorSpy = jest.fn()
    const MyFormField = props => {
      useFormField(props)
      return <div />
    }
    mount(
      <ErrorBoundary spy={errorSpy}>
        <FormContext.Provider value={testCtx}>
          <MyFormField {...testProps} name={undefined} />
        </FormContext.Provider>
      </ErrorBoundary>
    )
    expect(errorSpy.mock.calls[0][0].message).toBe('useFormField requires a name')
  })

  it('should unregister field on unmount', () => {
    const spy = jest.fn()
    const MyFormField = (props) => {
      useFormField(props)
      return <div />
    }
    const wrapper = mount(
      <FormContext.Provider value={{ ...testCtx, onUnregisterField: spy }}>
        <MyFormField {...testProps} />
      </FormContext.Provider>
    )
    wrapper.unmount()
    expect(spy).toHaveBeenCalled()
  })

  it('should NOT unregister field on unmount if isPersistOnUnmount', () => {
    const spy = jest.fn()
    const MyFormField = (props) => {
      useFormField(props)
      return <div />
    }
    const wrapper = mount(
      <FormContext.Provider value={{ ...testCtx, onUnregisterField: spy }}>
        <MyFormField {...testProps} isPersistOnUnmount />
      </FormContext.Provider>
    )
    wrapper.unmount()
    expect(spy).not.toHaveBeenCalled()
  })

})