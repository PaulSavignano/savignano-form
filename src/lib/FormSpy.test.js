import React from 'react'
import {
  cleanup,
  render,
} from '@testing-library/react'

import Form from './Form'
import FormField from './FormField'
import FormSpy from './FormSpy'

afterEach(cleanup)

const initialValues = {
  firstName: 'Paul',
  lastName: 'Savignano'
}

describe('FormSpy', () => {
  it('should match snapshot', async () => {
    const { asFragment } = render(
      <Form initialValues={initialValues}>
        <FormSpy names={['firstName', 'lastName']}>
          {(values) => (
            <>
              <FormField
                name="firstName"
                component="input"
              />
              <FormField
                name="firstName"
                component="input"
              />
            </>
          )}
        </FormSpy>
      </Form>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
