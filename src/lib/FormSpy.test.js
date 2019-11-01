import React from 'react'
import { shallow } from 'enzyme'

import FormContext from './FormContext'
import FormSpy from './FormSpy'
import getSpiedValues from './utils/getSpiedValues'

const testNames = ['email1', 'email2']

const testValues = {
  email1: 'test1@test.com',
  email2: 'test2@test.com',
  email3: 'test3@test.com'
}

const testCtx = {
  errors: {},
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onUnregisterField: jest.fn(),
  touched: {},
  values: { ...testValues }
}

const testProps = {
  children: jest.fn(),
  names: testNames,
}

describe('FormSpy', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <FormContext.Provider value={testCtx}>
        <FormSpy {...testProps} />
      </FormContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
