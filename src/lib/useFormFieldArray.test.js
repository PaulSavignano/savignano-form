import React from 'react'
import {
  fireEvent,
  render,
} from '@testing-library/react'

import Form from './Form'
import {
  TestFieldArray
} from './testData'
import { handleDelete } from './useFormFieldArray'


const emails = [{ email: 'one@test.com' }, { email: 'two@test.com' }]
const initialValues = { emails }
const onSubmit = jest.fn()

describe('handleDelete', () => {

  it('should remove array index from state', () => {
    const index = 0
    const state = {
      values: { emails: [...emails] },
      errors: {},
      touched: {},
    }
    const stateUpdate = handleDelete({
      name: 'emails',
      state,
      method: a => a.splice(index, 1),
      index
    })
    expect(stateUpdate).toEqual({
      isTouched: true,
      values: { emails: [emails[1]] }
    })
  })


  it('should delete error and touched if indexed', () => {
    const index = 0
    const state = {
      values: { emails: [...emails] },
      errors: { emails: emails.map(() => 'Required') },
      touched: { emails: emails.map(() => true) },
    }
    const stateUpdate = handleDelete({
      name: 'emails',
      state,
      method: a => a.splice(index, 1),
      index
    })
    expect(stateUpdate).toEqual({
      isTouched: true,
      values: { emails: [emails[1]] },
      errors: { emails: ['Required'] },
      touched: { emails: [true] },
    })
  })
})

describe('useFormFieldArray', () => {

  it('should change array when calling onChange', () => {
    const {
      getByLabelText,
      getByText,
    } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <TestFieldArray name="emails" />
      </Form>
    )
    const onChangeBtn = getByText('Change')
    fireEvent.click(onChangeBtn)
    const firstField = getByLabelText('emails 1')
    expect(firstField.value).toEqual(emails[0].email)
  })

  it('should delete by index', () => {
    const {
      getByLabelText,
      getByTestId,
      queryAllByText,
    } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <TestFieldArray name="emails" />
      </Form>
    )
    const deleteButton = getByTestId('delete-0')
    fireEvent.click(deleteButton)
    const deleteButtons = queryAllByText('Delete')
    const field = getByLabelText('emails 0')
    expect(deleteButtons).toHaveLength(1)
    expect(field.value).toEqual(emails[1].email)
  })

  it('should delete from end when calling onPop', () => {
    const {
      getByLabelText,
      getByText,
      queryAllByText,
    } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <TestFieldArray name="emails" />
      </Form>
    )
    const onPopBtn = getByText('Pop')
    fireEvent.click(onPopBtn)
    const deleteButtons = queryAllByText('Delete')
    const firstField = getByLabelText('emails 0')
    expect(deleteButtons).toHaveLength(1)
    expect(firstField.value).toEqual(emails[0].email)
  })

  it('should add to end when calling onPush', () => {
    const {
      getByText,
      queryAllByText,
    } = render(
      <Form onSubmit={onSubmit}>
        <TestFieldArray name="emails" />
      </Form>
    )
    const onPushBtn = getByText('Push')
    fireEvent.click(onPushBtn)
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(1)
  })

  it('should delete from front when calling onShift', () => {
    const {
      getByText,
      queryAllByText,
      getByLabelText,
    } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <TestFieldArray name="emails" />
      </Form>
    )
    const onShiftBtn = getByText('Shift')
    fireEvent.click(onShiftBtn)
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(1)
    const field = getByLabelText('emails 0')
    expect(field.value).toEqual(initialValues.emails[1].email)
  })

  it('should add to front when calling onUnshift', () => {
    const {
      getByText,
      queryAllByText,
      getByLabelText,
    } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <TestFieldArray name="emails" />
      </Form>
    )
    const onUnshiftBtn = getByText('Unshift')
    fireEvent.click(onUnshiftBtn)
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(3)
    const field = getByLabelText('emails 1')
    expect(field.value).toEqual(initialValues.emails[0].email)
  })


})
