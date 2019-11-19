import React from 'react'
import PropTypes from 'prop-types'

import FormComponent from './FormComponent'
import FormProvider from './FormProvider'

function Form({
  children,
  className,
  component,
  defaultValues,
  initialValues,
  onSubmit,
  onValidate,
  style,
}) {
  return (
    <FormProvider
      defaultValues={defaultValues}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onValidate={onValidate}
    >
      <FormComponent
        className={className}
        component={component}
        onSubmit={onSubmit}
        style={style}
      >
        {children}
      </FormComponent>
    </FormProvider>
  )
}

Form.defaultProps = {
  className: undefined,
  component: 'form',
  defaultValues: {},
  initialValues: {},
  onSubmit: undefined,
  onValidate: undefined,
  style: undefined,
}

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string]),
  defaultValues: PropTypes.shape(Object),
  initialValues: PropTypes.shape(Object),
  onSubmit: PropTypes.func,
  onValidate: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.object),
}

export default Form
