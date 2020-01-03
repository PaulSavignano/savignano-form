import React from 'react'
import {
  cleanup,
  render,
} from '@testing-library/react'

import Form from './Form'
import FormField from './FormField'
import FormFieldArray from './FormFieldArray'

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

describe('FormFieldArray', () => {
  it('should match snapshot', async () => {
    const { asFragment } = render(
      <Form initialValues={initialValues}>
        <FormFieldArray name="emails" component={TestComponent} />
      </Form>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
