import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'

function FormReset(props) {
  const { component: Comp, names, ...rest } = props
  return (
    <Context.Consumer>
      {({ onReset }) => (
        <Comp
          {...rest}
          onClick={() => onReset(names)}
          type="button"
        />
      )}
    </Context.Consumer>
  )
}

FormReset.defaultProps = {
  names: [],
  component: 'button',
}

FormReset.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  names: PropTypes.arrayOf(PropTypes.string)
}

export default FormReset
