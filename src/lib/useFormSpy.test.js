import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useFormSpy from './useFormSpy'
import FormContext from './FormContext'
import { testCtx } from './testData'

test('should return spied values', () => {
  const expected = {
    firstName: 'Paul',
    lastName: 'Savignano',
  }
  const values = {
    ...expected,
    email: 'paul@gmail.com'
  }
  const names = ['firstName', 'lastName']
  const wrapper = ({ children }) => <FormContext.Provider value={{ ...testCtx, values }}>{children}</FormContext.Provider>
  const { result } = renderHook(() => useFormSpy({ names }), { wrapper })
  expect(result.current.values).toEqual(expected)
})