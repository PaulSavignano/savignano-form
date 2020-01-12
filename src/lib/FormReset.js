import React from 'react'
import PropTypes from 'prop-types'

import useFormReset from './useFormReset'

function FormReset({ component: Comp, names, ...rest }) {
  const { onReset, isDisabled } = useFormReset(names)
  return (
    <Comp
      {...rest}
      onClick={() => onReset(names)}
      disabled={isDisabled}
      type="button"
    />
  )
}

FormReset.defaultProps = {
  names: [],
  component: 'button',
  children: 'Reset'
}

FormReset.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object, PropTypes.func]),
  names: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object, PropTypes.func])
}

export default FormReset
