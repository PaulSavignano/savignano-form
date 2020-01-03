import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import useFormSubmit from './useFormSubmit'

function FormSubmit(props) {
  const {
    isDisabled,
    isSubmitError,
    isSubmitSuccess,
    isSubmitting,
    onSubmit,
  } = useFormSubmit()
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
        {...onClick && { onClick: () => onSubmit(onClick) }}
        {...onPress && { onPress: () => onSubmit(onPress) }}
        disabled={disabled || isDisabled}
      >
        {SubmitStateComponent ? (
          <SubmitStateComponent
            isSubmitError={isSubmitError}
            isSubmitSuccess={isSubmitSuccess}
            isSubmitting={isSubmitting}
          >
            {children}
          </SubmitStateComponent>
        ) : children}
      </Comp>
    )
  }, [SubmitStateComponent, children, disabled, isDisabled, isSubmitError, isSubmitSuccess, isSubmitting, onClick, onPress, onSubmit, rest])
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
