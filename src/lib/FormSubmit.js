import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'

export function getSubmitState(props) {
  const { children, isSubmitting, isSubmitSuccess, isSubmitError } = props
  switch (true) {
    case isSubmitting:
      return '...submitting'
    case isSubmitSuccess:
      return children
    case isSubmitError:
      return 'Error'
    default:
      return children
  }
}

function FormSubmit(props) {
  const {
    children,
    component: Comp,
    isDisabled,
    submitStateComponent: SubmitStateComponent,
    type,
    ...rest
  } = props
  return (
    <Context.Consumer>
      {({ isErrors, isSubmitSuccess, isSubmitting, onSubmit, submitError }) => (
        <Comp {...rest} {...type !== 'submit' && { onClick: onSubmit }} disabled={isDisabled || isSubmitting || isErrors} type={type}>
          {SubmitStateComponent ? (
            <SubmitStateComponent
              isSubmitError={Boolean(submitError)}
              isSubmitSuccess={isSubmitSuccess}
              isSubmitting={isSubmitting}
            >
              {children}
            </SubmitStateComponent>
          ) : getSubmitState({
            children,
            isSubmitError: Boolean(submitError),
            isSubmitSuccess,
            isSubmitting,
          })}
        </Comp>
      )}
    </Context.Consumer>
  )
}

FormSubmit.defaultProps = {
  isDisabled: false,
  submitStateComponent: undefined,
  type: 'submit',
}

FormSubmit.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  component: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  submitStateComponent: PropTypes.elementType,
  type: PropTypes.string,
}

export default FormSubmit
