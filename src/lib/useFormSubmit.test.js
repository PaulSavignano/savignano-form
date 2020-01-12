import React from 'react'
import {
  fireEvent,
  render,
} from '@testing-library/react'

import Form from './Form'
import { TestField, TestSubmit } from './testData'

import { isDisabled } from './useFormSubmit'

describe('isDisabled', () => {
  const testProps = {
    isErrors: false,
    isSubmitError: false,
    isSubmitFailure: false,
    isSubmitting: false,
  }
  it('should return true if isSubmitting', () => {
    const props = {
      ...testProps,
      isSubmitting: true,
    }
    expect(isDisabled(props)).toEqual(true)
  })
  it('should return true if isSubmitFailure and isErrors', () => {
    const props = {
      ...testProps,
      isErrors: true,
      isSubmitFailure: true,
    }
    expect(isDisabled(props)).toEqual(true)
  })
  it('should return true if isSubmitFailure and isSubmitError', () => {
    const props = {
      ...testProps,
      isSubmitError: true,
      isSubmitFailure: true,
    }
    expect(isDisabled(props)).toEqual(true)
  })
  it('should return true if isTouched and isErrors', () => {
    const props = {
      ...testProps,
      isTouched: true,
      isErrors: true,
    }
    expect(isDisabled(props)).toEqual(true)
  })
})

describe('useFormSubmit', () => {
  it('should submit form', () => {
    const spy = jest.fn(() => Promise.resolve({}))
    const {
      getByLabelText,
      getByText,
    } = render(
      <Form onSubmit={spy}>
        <TestField name="email" label="Email" />
        <TestSubmit>Submit</TestSubmit>
      </Form>
    )
    const field = getByLabelText('Email')
    fireEvent.change(field, { target: { value: 'email@test.com' } })
    fireEvent.blur(field, { target: { value: 'email@test.com' } })
    const submit = getByText('Submit')
    fireEvent.click(submit)
    expect(spy).toHaveBeenCalledWith({ email: 'email@test.com' })
  })

})