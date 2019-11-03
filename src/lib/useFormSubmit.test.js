import React from 'react'
import { mount } from 'enzyme'

import FormContext from './FormContext'
import useFormSubmit from './useFormSubmit'

const testCtx = {
  isErrors: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  isTouched: false,
  onSubmit: jest.fn(),
  submitError: ''
}

describe('useFormSubmit', () => {
  it('should return context', () => {
    const expected = {
      isClean: true,
      isDisabled: true,
      isErrors: testCtx.isErrors,
      isSubmitError: false,
      isSubmitSuccess: testCtx.isSubmitSuccess,
      isSubmitting: testCtx.isSubmitting,
      onSubmit: testCtx.onSubmit,
      submitError: testCtx.submitError
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