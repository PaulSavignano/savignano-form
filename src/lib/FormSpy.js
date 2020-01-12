import PropTypes from 'prop-types'

import useFormSpy from './useFormSpy'

function FormSpy({ children, names }) {
  const { values } = useFormSpy({ names })
  return children(values)
}

FormSpy.defaultProps = {
  names: []
}

FormSpy.propTypes = {
  children: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string)
}

export default FormSpy
