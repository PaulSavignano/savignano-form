import React from 'react'
import { mount, shallow } from 'enzyme'

import FormField from './FormField'
import FormContext from './FormContext'

const testCtx = {
  errors: {},
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onUnregisterField: jest.fn(),
  touched: {},
  values: {}
}

const testProps = {
  component: 'input',
  id: '1',
  name: 'email',
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  type: 'text',
  value: undefined
}

describe('FormField', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <FormContext.Provider value={testCtx}>
        <FormField {...testProps} />
      </FormContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
