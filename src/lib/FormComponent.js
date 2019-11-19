import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'

function FormComponent({
  children,
  component: Comp,
  onSubmit: onSubmitProp,
  ...rest
}) {
  const { onSubmit } = useContext(FormContext)
  return (
    <Comp
      {...rest}
      {...onSubmitProp && { onSubmit }}
    >
      {children}
    </Comp>
  )
}

FormComponent.defaultProps = {
  className: undefined,
  component: 'form',
  onSubmit: undefined,
  style: undefined,
}

FormComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string]),
  onSubmit: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.object),
}

export default FormComponent
