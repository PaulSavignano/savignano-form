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
  names: []
}

FormReset.propTypes = {
  component: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string)
}

export default FormReset
