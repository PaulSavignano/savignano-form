import { useContext, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import getIn from './utils/getIn'
import setIn from './utils/setIn'


export function getValueArray(value) {
  if (value && value.length) {
    return value.map((v, i) => i)
  }
  return []
}

export function getInitialValueArray({ name, value, initialValues, defaultValues }) {
  if (value && value.length) return getValueArray(value)
  const initialValue = getIn(initialValues, name)
  if (initialValue) return getValueArray(initialValue)
  const defaultValue = getIn(defaultValues, name)
  if (defaultValue) return getValueArray(defaultValue)
  return []
}


function useFormFieldArray({ name }) {
  const {
    setFormState,
    values,
    touched,
    formProps: { defaultValues, initialValues }
  } = useContext(FormContext)

  const value = getIn(values, name) || []
  const lastValueArray = useRef(getValueArray(value))

  const [valueArray, setValueArray] = useState(getInitialValueArray({ name, value, initialValues, defaultValues }))

  const onAdd = () => {
    const nextValueArray = [...valueArray, valueArray.length]
    setValueArray(nextValueArray)
  }

  const onChange = (changedValue) => {
    const nextValues = setIn(values, name, changedValue)
    const nextValueArray = getValueArray(changedValue)
    setFormState({ values: nextValues, isTouched: true })
    return setValueArray(nextValueArray)
  }

  const onDelete = index => {
    const nextValue = value.filter((v, i) => i !== index)
    const nextValueArray = nextValue.map((v, i) => i)
    lastValueArray.current = nextValueArray
    setFormState({
      values: setIn(values, name, nextValue),
      isTouched: true
    })
    return setValueArray(nextValueArray)
  }

  useEffect(() => {
    console.log('value', value, 'lastValue.current', lastValueArray.current, 'touched', Boolean(getIn(touched, name)))
    if (value.length !== lastValueArray.current.length) {
      const isTouched = Boolean(getIn(touched, name))
      if (!isTouched) {
        setValueArray(getInitialValueArray({ name, value, initialValues, defaultValues }))
      }
      if (isTouched) {
        console.log('got it')
      }
      lastValueArray.current = getValueArray(value)
    }
  }, [defaultValues, initialValues, name, touched, value])


  return {
    name,
    onAdd,
    onDelete,
    onChange,
    value: valueArray
  }
}

useFormFieldArray.propTypes = {
  name: PropTypes.string.isRequired,
}

export default useFormFieldArray
