import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react'

import Form from './Form'
import FormField from './FormField'
import FormReset from './FormReset'
import useFormFieldArray, { getInitialValueArray, getValueArray } from './useFormFieldArray'

const initialValues = {
  emails: [{ email: 'test1@test.com' }]
}

const TestComponent = ({
  name,
}) => {
  const {
    onAdd,
    onChange,
    onDelete,
    value,
  } = useFormFieldArray({ name })
  return (
    <div>
      <button onClick={() => onAdd()} type="button">
        Add
      </button>
      <button
        onClick={() => onChange([{ email: 'test1@test.com' }, { email: 'test2@test.com' }])}
        type="button"
      >
        Change
      </button>
      <ul>
        {value.map((v, i) => (
          <li key={i}>
            <FormField
              name={`${name}.${i}.email`}
              component="input"
              label={`${name} ${i}`}
              id={`${name} ${i}`}
              type="text"
            />
            <button data-testid={`delete-${i}`} onClick={() => onDelete(i)} type="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}


afterEach(cleanup)

describe('getValueArray', () => {
  it('should return index array from object array', () => {
    const valueArray = getValueArray([{ email: 'test1@test.com' }, { email: 'test2@test.com' }])
    expect(valueArray).toEqual([0, 1])
  })
  it('should return empty array if value is undefined', () => {
    const valueArray = getValueArray(undefined)
    expect(valueArray).toEqual([])
  })
})

describe('getInitialValueArray', () => {
  it('should return array of indexes', () => {
    const value = [{ email: 'test1@test.com' }, { email: 'test2@test.com' }]
    const initialValueArray = getInitialValueArray({ name: 'emails', value })
    expect(initialValueArray).toEqual([0, 1])
  })
  it('should return empty array if value is undefined', () => {
    const value = undefined
    const initialValueArray = getInitialValueArray({ name: 'emails', value })
    expect(initialValueArray).toEqual([])
  })
  it('should return defaultValue indexes if no value or initialValue', () => {
    const defaultValues = { emails: [{ email: 'test1@test.com' }, { email: 'test2@test.com' }] }
    const initialValueArray = getInitialValueArray({ name: 'emails', defaultValues })
    expect(initialValueArray).toEqual([0, 1])
  })
})


describe('useFormFieldArray', () => {

  it('should add to array when calling onAdd', () => {
    const name = 'emails.1.email'
    const label = 'emails 1'
    const value = 'new@test.com'
    const { getByText, queryAllByText, getByLabelText } = render(
      <Form initialValues={initialValues}>
        <TestComponent name="emails" />
      </Form>
    )
    const addButton = getByText("Add")
    fireEvent.click(addButton)
    const field = getByLabelText(label)
    fireEvent.change(field, { target: { name, value } })
    const deleteButtons = queryAllByText('Delete')
    const changedField = getByLabelText(label)
    expect(deleteButtons).toHaveLength(2)
    expect(changedField.value).toEqual(value)
  })

  it('should delete from array when calling onDelete', () => {
    const { getByTestId, queryAllByText, getByText } = render(
      <Form initialValues={initialValues}>
        <TestComponent name="emails" />
      </Form>
    )
    const addButton = getByText('Add')
    fireEvent.click(addButton)
    fireEvent.click(getByTestId('delete-1'))
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(1)
  })

  it('should change root array to new objects', () => {
    const { getByText, queryAllByText } = render(
      <Form initialValues={initialValues}>
        <TestComponent name="emails" />
      </Form>
    )

    fireEvent.click(getByText("Change"))
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(2)
  })

})
