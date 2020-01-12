import React from 'react'
import {
  useFormField,
  useFormFieldArray,
  useFormSubmit,
  useFormReset,
} from './index'

export const testSubmit = jest.fn(() => Promise.resolve({}))

export const testFields = {
  email: {
    name: 'email',
    type: 'text',
  },
}

export const testProps = {
  children: <div />,
  defaultValues: {},
  initialValues: {},
  onSubmit: jest.fn(() => Promise.resolve({})),
}

export const testState = {
  errors: {},
  formProps: testProps,
  initialValues: {},
  isSubmitFailure: false,
  isSubmitSuccess: false,
  isSubmitting: false,
  isTouched: false,
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onRegisterField: jest.fn(),
  onReset: jest.fn(),
  onSubmit: jest.fn(),
  onUnregisterField: jest.fn(),
  setFormState: jest.fn(),
  submitError: '',
  touched: {},
  values: {},
}

export const testCtx = { ...testState }

export const validateRequired = ({ value }) => !value ? 'Required' : undefined


export function TestReset({ names, ...rest }) {
  const { onReset, isDisabled } = useFormReset(names)
  return (
    <button
      {...rest}
      onClick={() => onReset(names)}
      disabled={isDisabled}
      type="button"
    />
  )
}

export const TestField = ({
  id,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate,
  type,
}) => {
  const {
    checked,
    error,
    isTouched,
    onBlur,
    onChange,
    value,
  } = useFormField({
    name,
    onBlur: onBlurCallback,
    onChange: onChangeCallback,
    onFormat,
    onParse,
    onValidate,
    type,
  })
  return (
    <div>
      <label htmlFor={id}>
        {label}
        <input
          checked={checked}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          type={type}
          value={value}
        />
      </label>
      {isTouched && error ? <span>{error}</span> : null}
    </div>
  )
}


export const TestFieldArray = ({ name }) => {
  const {
    onChange,
    onDelete,
    onPop,
    onPush,
    onShift,
    onUnshift,
    values,
  } = useFormFieldArray({ name })
  return (
    <div>
      <button onClick={() => onChange(values.reverse())} type="button">Change</button>
      <button onClick={() => onPop()} type="button">Pop</button>
      <button onClick={() => onPush({ name: '' })} type="button">Push</button>
      <button onClick={() => onShift()} type="button">Shift</button>
      <button onClick={() => onUnshift({ name: '' })} type="button">Unshift</button>
      <ul>
        {values.map((v, i) => (
          <li key={`${name} ${i}`}>
            <TestField
              id={`${name} ${i}`}
              label={`${name} ${i}`}
              name={`${name}.${i}.email`}
              onValidate={validateRequired}
              type="text"
            />
            <button
              data-testid={`delete-${i}`}
              onClick={() => onDelete(i)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export const TestSubmit = ({
  children,
  component: Comp,
  disabled,
  submitStateComponent: SubmitStateComponent,
  onClick,
  onPress,
  ...rest
}) => {
  const {
    isDisabled,
    isSubmitError,
    isSubmitSuccess,
    isSubmitting,
    onSubmit,
  } = useFormSubmit()
  const renderChildren = () => {
    if (isSubmitting) return 'Submitting'
    if (isSubmitSuccess) return 'Submit Success'
    if (isSubmitError) return 'Submit Error'
    return children
  }
  return (
    <button
      {...rest}
      {...onClick && { onClick: () => onSubmit(onClick) }}
      {...onPress && { onPress: () => onSubmit(onPress) }}
      disabled={disabled || isDisabled}
    >
      {renderChildren()}
    </button>
  )
}