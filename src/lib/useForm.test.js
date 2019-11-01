import React from 'react'
import { mount } from 'enzyme'

import FormContext from './FormContext'
import useForm from './useForm'

const testCtx = {
  errors: {},
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onUnregisterField: jest.fn(),
  touched: {},
  values: {}
}


describe('useForm', () => {
  it('should return context', () => {
    const MyForm = props => {
      const hook = useForm()
      expect(hook).toEqual(testCtx)
      return <div />
    }
    mount(
      <FormContext.Provider value={testCtx}>
        <MyForm />
      </FormContext.Provider>
    )
  })
})