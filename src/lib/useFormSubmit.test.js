import React from 'react'
import { mount } from 'enzyme'

import FormContext from './FormContext'
import useFormSubmit from './useFormSubmit'

const testCtx = {
  isErrors: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  onSubmit: jest.fn(),
  submitError: undefined,
}

describe('useFormSubmit', () => {
  it('should return context', () => {
    const expected = {
      isSubmitting: testCtx.isSubmitting,
      isSubmitSuccess: testCtx.isSubmitSuccess,
      isSubmitError: false,
      isDisabled: false,
      onSubmit: testCtx.onSubmit,
    }
    const MyFormSubmit = (props) => {
      const hook = useFormSubmit()
      expect(hook).toEqual(expected)
      return <div />
    }
    mount(
      <FormContext.Provider value={testCtx}>
        <MyFormSubmit />
      </FormContext.Provider>
    )
  })
})