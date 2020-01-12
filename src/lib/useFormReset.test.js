import React from 'react'
import {
  fireEvent,
  render,
} from '@testing-library/react'

import Form from './Form'
import { TestReset, TestField, testSubmit } from './testData'

describe('useFormReset', () => {
  it('should reset values', () => {
    const {
      getByLabelText,
      getByText,
    } = render(
      <Form onSubmit={testSubmit}>
        <TestField name="firstName" label="First Name" />
        <TestField name="lastName" label="Last Name" />
        <TestReset>Reset</TestReset>
      </Form>
    )
    const firstNameField = getByLabelText('First Name')
    fireEvent.change(firstNameField, { target: { value: 'Paul' } })
    fireEvent.blur(firstNameField, { target: { value: 'Paul' } })
    const reset = getByText('Reset')
    fireEvent.click(reset)
    expect(getByLabelText('First Name').value).toEqual('')
  })

  it('should reset values for names provided', () => {
    const {
      getByLabelText,
      getByText,
    } = render(
      <Form onSubmit={testSubmit}>
        <TestField name="firstName" label="First Name" />
        <TestField name="lastName" label="Last Name" />
        <TestReset names={['firstName']}>Reset</TestReset>
      </Form>
    )
    const firstName = 'Paul'
    const lastName = 'Savignano'
    const firstNameField = getByLabelText('First Name')
    fireEvent.change(firstNameField, { target: { value: firstName } })
    fireEvent.blur(firstNameField, { target: { value: firstName } })
    const lastNameField = getByLabelText('Last Name')
    fireEvent.change(lastNameField, { target: { value: lastName } })
    fireEvent.blur(lastNameField, { target: { value: lastName } })
    const reset = getByText('Reset')
    fireEvent.click(reset)
    expect(getByLabelText('First Name').value).toEqual('')
    expect(getByLabelText('Last Name').value).toEqual(lastName)
  })
})