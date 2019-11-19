import React from 'react'
import { mount, shallow } from 'enzyme'

import FormProvider from './FormProvider'
import FormComponent from './FormComponent'

const testProps = {
  children: <div />,
  className: undefined,
  component: undefined,
  onSubmit: undefined,
  style: undefined,
}

describe('FormComponent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <FormProvider>
        <FormComponent {...testProps} />
      </FormProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should pass an onSubmit prop if provided', () => {
    const onSubmit = jest.fn()
    const wrapper = mount(
      <FormProvider>
        <FormComponent {...testProps} onSubmit={onSubmit} test="Testing" />
      </FormProvider>
    )
    const formComponent = wrapper.find('FormComponent')
    expect(formComponent.props().onSubmit).toEqual(onSubmit)
  })
})
