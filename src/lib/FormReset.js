import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'

function FormReset(props) {
  const { onReset } = useContext(FormContext)
  const { component: Comp, names, ...rest } = props
  return useMemo(() => (
    <Comp
      {...rest}
      onClick={() => onReset(names)}
      type="button"
    />
  ), [names])
}

FormReset.defaultProps = {
  names: [],
  component: 'button',
}

FormReset.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object, PropTypes.func]),
  names: PropTypes.arrayOf(PropTypes.string)
}

export default FormReset
