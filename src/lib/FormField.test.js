import React from 'react'
import {
  cleanup,
  render,
} from '@testing-library/react'

import Form from './Form'
import FormField, { getInputProps } from './FormField'

const testProps = {
  component: 'input',
  id: '1',
  name: 'email',
  label: 'Email',
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  type: 'text',
  value: undefined
}

describe('getInputProps', () => {
  it('should return aria-label only if component is string', () => {
    const inputProps = getInputProps({
      component: 'input',
      label: 'Test',
      isTouched: false
    })
    expect(inputProps).toEqual({ 'aria-label': 'Test' })
  })
  it('should return aria-label and isTouched if component NOT a string', () => {
    const TestComponent = () => <div />
    const inputProps = getInputProps({
      component: TestComponent,
      label: 'Test',
      isTouched: true
    })
    expect(inputProps).toEqual({ label: 'Test', isTouched: true })
  })
})

describe('FormField', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Form>
        <FormField {...testProps} />
      </Form>
    )
    expect(asFragment()).toMatchSnapshot()
  })

})
