import React from 'react'
import { shallow } from 'enzyme'

import Form from './Form'

const testProps = {
  children: <div />,
  className: undefined,
  component: undefined,
  defaultValues: {},
  initialValues: {},
  onSubmit: jest.fn(() => Promise.resolve({})),
  onValidate: undefined,
  style: undefined,
}

describe('Form', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Form {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
