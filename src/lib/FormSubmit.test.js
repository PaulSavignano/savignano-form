import React from 'react'
import { shallow } from 'enzyme'

import FormSubmit, { getSubmitState } from './FormSubmit'

const testCtx = {
  isErrors: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  onSubmit: jest.fn(),
  submitError: '',
}

const testProps = {
  children: 'Save',
  component: p => <button type="button" {...p} />,
  submitStateComponent: undefined,
}

describe('getSubmitState', () => {
  it('should return submitting if isSubmitting', () => {
    const submitState = getSubmitState({
      isSubmitting: true
    })
    expect(submitState).toEqual('...submitting')
  })
  it('should return children if isSubmitSuccess', () => {
    const children = 'Submit Form'
    const submitState = getSubmitState({
      children,
      isSubmitSuccess: true
    })
    expect(submitState).toEqual(children)
  })
  it('should return error if isSubmitError', () => {
    const submitState = getSubmitState({
      isSubmitError: true
    })
    expect(submitState).toEqual('Error')
  })
  it('should return children as default', () => {
    const children = 'Submit Form'
    const submitState = getSubmitState({
      children,
      isSubmitError: false,
      isSubmitSuccess: false,
      isSubmitting: false,
    })
    expect(submitState).toEqual(children)
  })
})

describe('FormSubmit', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<FormSubmit {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should create onClick prop with a value of onSubmit when type is button', () => {
    const spy = jest.fn()
    const wrapper = shallow(<FormSubmit {...testProps} type="button" />)
    const contextWrapper = shallow(wrapper.prop('children')({ ...testCtx, onSubmit: spy }))
    const button = contextWrapper.find('button')
    expect(button.props().onClick).toEqual(spy)
  })

  it('should not render with submitStateComponent if NOT defined', () => {
    const wrapper = shallow(<FormSubmit {...testProps} />)
    const contextWrapper = shallow(wrapper.prop('children')({ ...testCtx }))
    expect(contextWrapper.find('submitStateComponent').exists()).toBe(false)
  })

  it('should render submitStateComponent if defined', () => {
    const submitStateComponent = props => <div {...props} />
    const wrapper = shallow(<FormSubmit {...testProps} submitStateComponent={submitStateComponent} />)
    const contextWrapper = shallow(wrapper.prop('children')({ ...testCtx }))
    expect(contextWrapper.find('button').props().disabled).toEqual(false)
    expect(contextWrapper.find('button').props().type).toEqual('submit')
    expect(contextWrapper.find('submitStateComponent').exists()).toBe(true)
  })


})
