import React from 'react'
import { mount } from 'enzyme'

import FormContext from './FormContext'
import useFormReset from './useFormReset'


describe('useFormReset', () => {
  it('should return context', () => {
    const expected = {
      onReset: jest.fn()
    }
    const MyFormSubmit = () => {
      const hook = useFormReset()
      expect(hook).toEqual(expected)
      return <div />
    }
    mount(
      <FormContext.Provider value={expected}>
        <MyFormSubmit />
      </FormContext.Provider>
    )
  })
})