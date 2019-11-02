import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import useFormSubmit from './useFormSubmit'

function FormSubmit(props) {
  const { isErrors, isSubmitSuccess, isSubmitting, onSubmit, submitError } = useFormSubmit()
  const {
    children,
    component: Comp,
    disabled,
    submitStateComponent: SubmitStateComponent,
    onClick,
    onPress,
    ...rest
  } = props
  return useMemo(() => {
    return (
      <Comp
        {...rest}
        {...onClick && { onClick: onSubmit }}
        {...onPress && { onPress: onSubmit }}
        disabled={disabled || isSubmitting || isErrors}
      >
        {SubmitStateComponent ? (
          <SubmitStateComponent
            isSubmitError={Boolean(submitError)}
            isSubmitSuccess={isSubmitSuccess}
            isSubmitting={isSubmitting}
          >
            {children}
          </SubmitStateComponent>
        ) : children}
      </Comp>
    )
  }, [
    SubmitStateComponent,
    children,
    disabled,
    isErrors,
    isSubmitSuccess,
    isSubmitting,
    onClick,
    onPress,
    onSubmit,
    rest,
    submitError,
  ])
}

FormSubmit.defaultProps = {
  component: 'button',
  disabled: false,
  onClick: undefined,
  onPress: undefined,
  submitStateComponent: undefined,
  type: 'submit',
}

FormSubmit.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object, PropTypes.func]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  submitStateComponent: PropTypes.elementType,
  type: PropTypes.string,
}

export default FormSubmit
