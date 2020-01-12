import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import FormContext from './FormContext'
import useForm from './useForm'
import { testCtx } from './FormProvider.test'


describe('useForm', () => {
  it('should return context', () => {
    const wrapper = ({ children }) => <FormContext.Provider value={testCtx}>{children}</FormContext.Provider>
    const { result } = renderHook(() => useForm(), { wrapper })
    expect(result.current).toEqual(testCtx)
  })
})