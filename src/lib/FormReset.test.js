import React from 'react'
import { shallow } from 'enzyme'

import FormReset from './FormReset'

const testProps = {
  children: jest.fn(),
  component: p => <button {...p} type="button" />
}

const testCtx = {
  onReset: jest.fn()
}

describe('FormReset', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<FormReset {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render child component', () => {
    const wrapper = shallow(<FormReset {...testProps} />)
    const contextWrapper = shallow(wrapper.prop('children')({ ...testCtx }))
    expect(contextWrapper.find('button').exists()).toEqual(true)
  })
  it('should call onReset when clicked', () => {
    const wrapper = shallow(<FormReset {...testProps} />)
    const spy = jest.fn()
    const contextWrapper = shallow(wrapper.prop('children')({ onReset: spy }))
    const button = contextWrapper.find('button')
    button.props().onClick({ preventDefault: jest.fn() })
    expect(spy).toHaveBeenCalled()
  })
})
