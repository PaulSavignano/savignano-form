import React from 'react'
import { mount } from 'enzyme'

import FormContext from './FormContext'
import useFormSubmit, { isDisabled } from './useFormSubmit'

const testCtx = {
  errors: {},
  isSubmitFailure: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  onSubmit: jest.fn(),
  submitError: ''
}

describe('isDisabled', () => {
  it('should return true if isSubmitting', () => {
    const props = {
      isErrors: false,
      isSubmitError: false,
      isSubmitFailure: false,
      isSubmitting: true,
    }
    expect(isDisabled(props)).toEqual(true)
  })
  it('should return true if isSubmitFailure and isErrors', () => {
    const props = {
      isErrors: true,
      isSubmitError: false,
      isSubmitFailure: true,
      isSubmitting: false,
    }
    expect(isDisabled(props)).toEqual(true)
  })
  it('should return true if isSubmitFailure and isSubmitError', () => {
    const props = {
      isErrors: false,
      isSubmitError: true,
      isSubmitFailure: true,
      isSubmitting: false,
    }
    expect(isDisabled(props)).toEqual(true)
  })
})

describe('useFormSubmit', () => {
  it('should return context', () => {
    const expected = {
      isDisabled: false,
      isErrors: false,
      isSubmitError: false,
      isSubmitSuccess: testCtx.isSubmitSuccess,
      isSubmitting: testCtx.isSubmitting,
      onSubmit: testCtx.onSubmit,
      submitError: testCtx.submitError
    }
    const MyFormSubmit = () => {
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
  it('should return isDisabled of true if isSubmitFailure and is', () => {
    const expected = {
      isDisabled: false,
      isErrors: false,
      isSubmitError: false,
      isSubmitSuccess: testCtx.isSubmitSuccess,
      isSubmitting: testCtx.isSubmitting,
      onSubmit: testCtx.onSubmit,
      submitError: testCtx.submitError
    }
    const MyFormSubmit = () => {
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