import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react'

import Form from './Form'
import FormField from './FormField'
import FormFieldArray, { getInitialValueArray, getFiltered, getValueArray } from './FormFieldArray'

const initialValues = {
  emails: [{ email: 'test1@test.com' }]
}

const TestComponent = ({
  name,
  onAdd,
  onChange,
  onDelete,
  value,
}) => {
  console.log('TestComponent', value)
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
    const values = { emails: [{ email: 'test1@test.com' }, { email: 'test2@test.com' }] }
    const initialValueArray = getInitialValueArray({ name: 'emails', values })
    expect(initialValueArray).toEqual([0, 1])
  })
  it('should return empty array if value is undefined', () => {
    const values = {}
    const initialValueArray = getInitialValueArray({ name: 'emails', values })
    expect(initialValueArray).toEqual([])
  })
  it('should return defaultValue indexes if no value or initialValue', () => {
    const defaultValues = { emails: [{ email: 'test1@test.com' }, { email: 'test2@test.com' }] }
    const initialValueArray = getInitialValueArray({ name: 'emails', defaultValues })
    expect(initialValueArray).toEqual([0, 1])
  })
})

describe('getFiltered', () => {
  it('should filter array by index', () => {
    const props = {
      index: 0,
      value: [{ email: 'test1@test.com' }, { email: 'test2@test.com' }]
    }
    const filtered = getFiltered(props)
    expect(filtered).toEqual([props.value[1]])
  })
  it('should return undefined if no value', () => {
    const props = {
      index: 0,
      value: undefined
    }
    const filtered = getFiltered(props)
    expect(filtered).toEqual(undefined)
  })
})

describe('FormFieldArray', () => {
  it('should match snapshot', async () => {
    const { asFragment } = render(
      <Form initialValues={initialValues}>
        <FormFieldArray name="emails" component={TestComponent} />
      </Form>
    )
    expect(asFragment()).toMatchSnapshot()
  })


  it('should add to array when calling onAdd', () => {
    const { getByText, queryAllByText } = render(
      <Form initialValues={initialValues}>
        <FormFieldArray name="emails" component={TestComponent} />
      </Form>
    )
    fireEvent.click(getByText("Add"))
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(2)
  })

  it('should delete from array when calling onDelete', () => {
    const { getByTestId, queryAllByText } = render(
      <Form initialValues={initialValues}>
        <FormFieldArray name="emails" component={TestComponent} />
      </Form>
    )
    fireEvent.click(getByTestId('delete-0'))
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(0)
  })

  it('should change root array to new objects', () => {
    const { getByText, queryAllByText } = render(
      <Form initialValues={initialValues}>
        <FormFieldArray name="emails" component={TestComponent} />
      </Form>
    )

    fireEvent.click(getByText("Change"))
    const deleteButtons = queryAllByText('Delete')
    expect(deleteButtons).toHaveLength(2)
  })


})
