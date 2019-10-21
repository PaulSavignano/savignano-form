import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import getIn from './utils/getIn'

export const getSpied = ({ names, values }) => {
  const spied = names.reduce((a, v) => {
    a[v] = getIn(values, v)
    return a
  }, {})
  return spied
}

export const FormSpyRoot = React.memo(({ children, ...rest }) => children(rest))

FormSpyRoot.defaultProps = {
  names: []
}

FormSpyRoot.propTypes = {
  children: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string)
}

function FormSpy(props) {
  const { names, ...rest } = props
  return (
    <Context.Consumer>
      {({ values }) => <FormSpyRoot {...rest} {...getSpied({ names, values })} />}
    </Context.Consumer>
  )
}

FormSpy.defaultProps = {
  names: []
}

FormSpy.propTypes = {
  children: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string)
}

export default FormSpy
