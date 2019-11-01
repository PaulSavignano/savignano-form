import { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import getSpiedValues from './utils/getSpiedValues'

function FormSpy({ children, names }) {
  const { values } = useContext(FormContext)
  const spiedValues = getSpiedValues({ names, values })
  return useMemo(() => children({ ...spiedValues }), [spiedValues, names])
}

FormSpy.defaultProps = {
  names: []
}

FormSpy.propTypes = {
  children: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string)
}

export default FormSpy
