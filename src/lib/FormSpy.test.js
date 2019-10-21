import React from 'react'
import { shallow } from 'enzyme'

import FormSpy, { getSpied } from './FormSpy'

const testNames = ['email1', 'email2']

const testValues = {
  email1: 'test1@test.com',
  email2: 'test2@test.com',
  email3: 'test3@test.com'
}

const testProps = {
  children: jest.fn(),
  names: testNames,
}

describe('getSpied', () => {
  it('should return only the values for the names provided', () => {
    const spiedValues = getSpied({ names: [...testNames], values: { ...testValues } })
    expect(spiedValues).toEqual({
      email1: testValues.email1,
      email2: testValues.email2
    })
  })
})

describe('FormSpy', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<FormSpy {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render children with spied values', () => {
    const ctx = getSpied({ names: [...testNames], values: { ...testValues } })
    const spy = jest.fn()
    const wrapper = shallow(<FormSpy {...testProps}>{spy}</FormSpy>)
    shallow(wrapper.prop('children')({ values: ctx }))
    expect(spy).toHaveBeenCalled()
  })
})
