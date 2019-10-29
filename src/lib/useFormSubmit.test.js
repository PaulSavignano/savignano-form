import React from 'react'
import { mount } from 'enzyme'

import Context from './Context'
import useFormSubmit from './useFormSubmit'

const testCtx = {
  isErrors: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  onSubmit: jest.fn(),
  submitError: undefined,
}

const HookWrapper = ({ hook }) => <div hook={hook ? hook() : undefined} />
const HookProvider = ({ hook }) => (
  <Context.Provider value={testCtx}>
    <HookWrapper hook={() => hook()} />
  </Context.Provider>
)

describe('useFormSubmit', () => {
  it('should return context', () => {
    const expected = {
      isSubmitting: testCtx.isSubmitting,
      isSubmitSuccess: testCtx.isSubmitSuccess,
      isSubmitError: false,
      isDisabled: false,
      onSubmit: testCtx.onSubmit,
    }
    const MyFormSubmit = (props) => {
      const hook = useFormSubmit()
      expect(hook).toEqual(expected)
      return <div />
    }
    mount(
      <Context.Provider value={testCtx}>
        <MyFormSubmit />
      </Context.Provider>
    )
  })
})