import React from 'react'
import { mount, shallow } from 'enzyme'

import FormContext from './FormContext'
import FormSubmit from './FormSubmit'

const testCtx = {
  errors: {},
  isSubmitSuccess: false,
  isSubmitting: false,
  onSubmit: jest.fn(),
  touched: {},
  submitError: '',
}

const TestSubmit = props => <button type="button" {...props} />

const testProps = {
  children: 'Save',
  component: 'button',
  submitStateComponent: undefined,
}

describe('FormSubmit', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <FormContext.Provider value={testCtx}>
        <FormSubmit {...testProps} />
      </FormContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onSubmit if onClick prop', () => {
    const onSubmitSpy = jest.fn()
    const onClick = jest.fn()
    const wrapper = mount(
      <FormContext.Provider value={{ ...testCtx, onSubmit: onSubmitSpy }}>
        <FormSubmit {...testProps} onClick={onClick} />
      </FormContext.Provider>
    )
    const button = wrapper.find('button')
    button.props().onClick()
    expect(onSubmitSpy).toHaveBeenCalled()
  })

  it('should call onSubmit if onPress prop', () => {
    const onSubmitSpy = jest.fn()
    const onPress = jest.fn()
    const wrapper = mount(
      <FormContext.Provider value={{ ...testCtx, onSubmit: onSubmitSpy }}>
        <FormSubmit {...testProps} onPress={onPress} />
      </FormContext.Provider>
    )
    const button = wrapper.find('button')
    button.props().onPress()
    expect(onSubmitSpy).toHaveBeenCalled()
  })

  it('should render a SubmitStateComponent if provided', () => {
    const SubmitStateComponent = () => <div />
    const wrapper = mount(
      <FormContext.Provider value={testCtx}>
        <FormSubmit {...testProps} submitStateComponent={SubmitStateComponent} />
      </FormContext.Provider>
    )
    expect(wrapper.find('SubmitStateComponent').exists()).toEqual(true)
  })

})
