import React from 'react'
import { shallow } from 'enzyme'

import FormFieldArrayRoot, { getFiltered } from './FormFieldArrayRoot'
import setIn from './utils/setIn'

const Component = props => <div {...props} />

const testProps = {
  component: Component,
  name: 'emails',
  onState: jest.fn(),
  value: [{ email: 'testing1@test.com' }, { email: 'testing2@test.com' }],
  values: {},
}

describe('getFiltered', () => {
  it('should filter value by index', () => {
    const filtered = getFiltered({ index: 1, value: [...testProps.value] })
    expect(filtered).toEqual([testProps.value[0]])
  })
  it('should return empty array if no value', () => {
    const filtered = getFiltered({ index: 1, value: undefined })
    expect(filtered).toEqual([])
  })
})

describe('FormFieldArrayRoot', () => {

  it('should match snapshot', () => {
    const wrapper = shallow(<FormFieldArrayRoot {...testProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should add to array', () => {
    const wrapper = shallow(<FormFieldArrayRoot {...testProps} />)
    wrapper.props().onAdd()
    expect(wrapper.props().value).toEqual([0, 1, 2])
  })

  it('should delete from array', () => {
    const spy = jest.fn()
    const index = 0
    const filtered = testProps.value.filter((v, i) => i !== index)
    const values = setIn(testProps.values, testProps.name, filtered)
    const wrapper = shallow(
      <FormFieldArrayRoot
        {...testProps}
        onState={spy}
      />
    )
    wrapper.props().onDelete(index)
    expect(spy).toHaveBeenCalledWith({ values })
    expect(wrapper.props().value).toEqual([1])
  })

  it('should delete from array and delete value array', () => {
    const spy = jest.fn()
    const index = 0
    const values = setIn(testProps.values, testProps.name, undefined)
    const wrapper = shallow(<FormFieldArrayRoot {...testProps} value={[testProps.value[0]]} onState={spy} />)
    wrapper.props().onDelete(index)
    expect(spy).toHaveBeenCalledWith({ values })
  })

  it('should call onState with setIn values when invoking onChange', () => {
    const spy = jest.fn()
    const value = [testProps.value, testProps.value]
    const values = setIn(testProps.values, 'emails', value)
    const wrapper = shallow(<FormFieldArrayRoot {...testProps} onState={spy} />)
    wrapper.props().onChange({ name: testProps.name, value })
    expect(spy).toHaveBeenCalledWith({ values })
  })

})
