import React from 'react'
import { shallow } from 'enzyme'

import FormFieldArray from './FormFieldArray'

const testCtx = {
  errors: {},
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onState: jest.fn(),
  onUnregisterField: jest.fn(),
  touched: {},
  values: {}
}

const Component = props => <div {...props} />

const testProps = {
  name: 'email',
  component: Component,
}

describe('FormFieldArray', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<FormFieldArray {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass context value to FormFieldArrayRoot', () => {
    const wrapper = shallow(<FormFieldArray {...testProps} value={undefined} />)
    const email = []
    const contextWrapper = shallow(
      wrapper.prop('children')({
        ...testCtx,
        values: {
          ...testCtx.values,
          email
        }
      })
    )
    expect(contextWrapper.prop('value')).toEqual(email)
  })

})
