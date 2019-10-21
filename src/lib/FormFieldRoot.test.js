import React from 'react'
import { shallow } from 'enzyme'

import { FormFieldRootComponent } from './FormFieldRoot'

const testProps = {
  component: props => <div {...props} />,
  isPersistOnUnmount: false,
  name: 'email',
  onFormat: undefined,
  onParse: undefined,
  onRegisterField: jest.fn(),
  onUnregisterField: jest.fn(),
  onValidate: jest.fn(),
  value: 'testing@test.com'
}

describe('FormFieldRoot', () => {

  it('should match snapshot', () => {
    const wrapper = shallow(<FormFieldRootComponent {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should register field on mount', () => {
    const spy = jest.fn()
    const wrapper = shallow(<FormFieldRootComponent {...testProps} onRegisterField={spy} />)
    wrapper.dive()
    expect(spy).toHaveBeenCalled()
  })
  it('should unregister field on unmount if isPersistOnUnmount if false', () => {
    const spy = jest.fn()
    const wrapper = shallow(<FormFieldRootComponent {...testProps} onRegisterField={spy} />)
    wrapper.dive()
    wrapper.instance().componentWillUnmount()
    expect(spy).toHaveBeenCalled()
  })
  it('should not unregister field on unmount if isPersistOnUnmount if true', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <FormFieldRootComponent
        {...testProps}
        isPersistOnUnmount
        value="testing2@test.com"
        onUnregisterField={spy}
      />
    )
    wrapper.instance().componentWillUnmount()
    expect(spy).not.toHaveBeenCalled()
  })
  it('should call onFormat with value', () => {
    const spy = jest.fn()
    shallow(
      <FormFieldRootComponent
        {...testProps}
        isPersistOnUnmount
        onFormat={spy}
      />
    ).dive()
    expect(spy).toHaveBeenCalledWith(testProps.value)
  })
})
