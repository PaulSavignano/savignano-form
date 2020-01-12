import { useCallback, useContext, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import getIn from './utils/getIn'
import setIn from './utils/setIn'

export function getInWidthDefaultArray(obj, name) {
  return getIn(obj, name) || []
}

export function handleDelete({
  name,
  state,
  method,
  index,
}) {
  const errors = getInWidthDefaultArray(state.errors, name)
  const touched = getInWidthDefaultArray(state.touched, name)
  const values = getInWidthDefaultArray(state.values, name)
  const isError = Boolean(errors[index])
  const isTouched = Boolean(touched[index])
  if (isError) method(errors)
  if (isTouched) method(touched)
  method(values)
  const nextError = errors.filter(Boolean).length ? errors : undefined
  const nextTouched = touched.filter(Boolean).length ? touched : undefined
  return {
    ...isError && { errors: setIn(state.errors, name, nextError) },
    ...isTouched && { touched: setIn(state.touched, name, nextTouched) },
    isTouched: true,
    values: setIn(state.values, name, values),
  }
}

function useFormFieldArray({ name }) {
  const {
    setFormState,
    values: formValues,
    formProps: { defaultValues, initialValues }
  } = useContext(FormContext)

  const values = getInWidthDefaultArray(formValues, name)

  // Change array
  const onChange = useCallback((nextValues) => {
    setFormState(state => ({ values: setIn(state.values, name, nextValues) }))
  }, [name, setFormState])

  // Delete by index
  const onDelete = useCallback((index) => {
    setFormState(state => handleDelete({
      index,
      method: (a) => a.splice(index, 1),
      name,
      state,
    }))
  }, [name, setFormState])

  // Delete from end
  const onPop = useCallback(() => {
    setFormState(state => handleDelete({
      state,
      name,
      method: a => a.pop(),
      index: values.length - 1
    }))
  }, [name, setFormState, values.length])

  // Add to end
  const onPush = useCallback((props) => {
    setFormState((state) => {
      const nextValues = getInWidthDefaultArray(state.values, name)
      nextValues.push(props)
      return {
        isTouched: true,
        values: setIn(state.values, name, nextValues)
      }
    })
  }, [name, setFormState])

  // Delete from front
  const onShift = useCallback(() => {
    setFormState(state => handleDelete({
      state,
      name,
      method: a => a.shift(),
      index: 0,
    }))
  }, [name, setFormState])

  // Add to front
  const onUnshift = useCallback((props) => {
    setFormState(state => {
      const nextValues = getInWidthDefaultArray(state.values, name)
      nextValues.unshift(props)
      return {
        isTouched: true,
        values: setIn(state.values, name, nextValues)
      }
    })
  }, [name, setFormState])

  useEffect(() => {
    const initialValue = getIn(initialValues, name) || getIn(defaultValues, name)
    if (initialValue) {
      setFormState(state => ({ values: setIn(state.values, name, initialValue) }))
    }
  }, [defaultValues, initialValues, name, setFormState])

  return useMemo(() => ({
    name,
    onChange,
    onDelete,
    onPop,
    onPush,
    onShift,
    onUnshift,
    values
  }), [name, onChange, onDelete, onPop, onPush, onShift, onUnshift, values])
}

useFormFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
}

export default useFormFieldArray
