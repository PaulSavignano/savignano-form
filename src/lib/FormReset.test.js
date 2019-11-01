import React from 'react'
import { mount, shallow } from 'enzyme'

import FormContext from './FormContext'
import FormReset from './FormReset'

const testProps = {
  children: 'Reset',
  component: 'button'
}

const testCtx = {
  onReset: jest.fn()
}

describe('FormReset', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <FormContext.Provider value={testCtx}>
        <FormReset {...testProps} />
      </FormContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should call onReset when clicked', () => {
    const spy = jest.fn()
    const ctx = {
      onReset: spy
    }
    const wrapper = mount(
      <FormContext.Provider value={ctx}>
        <FormReset {...testProps} />
      </FormContext.Provider>
    )
    const button = wrapper.find('button')
    button.props().onClick({ preventDefault: jest.fn() })
    expect(spy).toHaveBeenCalled()
  })
})
