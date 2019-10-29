import React from 'react'
import { mount } from 'enzyme'

import Context from './Context'
import useFormField from './useFormField'

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

describe('useFormField', () => {

  it('should return context', () => {
    const expected = {
      error: testCtx.error,
      isTouched: testCtx.isTouched,
      onBlur: testCtx.onBlur,
      onChange: testCtx.onChange,
      value: 'test1@testing.com'
    }
    const MyFormField = (props) => {
      const fieldProps = useFormField(props)
      expect(fieldProps).toEqual(expected)
      return <div />
    }
    mount(
      <Context.Provider value={testCtx}>
        <MyFormField {...testProps} />
      </Context.Provider>
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
        <MyFormField {...testProps} name={undefined} />
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
      <Context.Provider value={{ ...testCtx, onUnregisterField: spy }}>
        <MyFormField {...testProps} />
      </Context.Provider>
    )
    wrapper.unmount()
    expect(spy).toHaveBeenCalled()
  })

})