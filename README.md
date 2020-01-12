<h1 align="center">Savignano-Form</h1>

<div align="center">

Manage form state in React.

[![NPM Version](https://img.shields.io/npm/v/savignano-form.svg?style=flat)](https://www.npmjs.com/package/savignano-form)
[![NPM Downloads](https://img.shields.io/npm/dm/savignano-form.svg?style=flat)](https://npmcharts.com/compare/savignano-form?minimal=true)
[![CircleCI](https://img.shields.io/circleci/build/github/PaulSavignano/savignano-form/master.svg)](https://circleci.com/gh/PaulSavignano/savignano-form/tree/master)
[![codecov.io](https://codecov.io/gh/PaulSavignano/savignano-form/branch/master/graph/badge.svg)](https://codecov.io/gh/PaulSavignano/savignano-form)
[![BundleSize](https://img.shields.io/bundlephobia/minzip/savignano-form.svg)](https://bundlephobia.com/result?p=savignano-form)
[![Dependencies](https://david-dm.org/PaulSavignano/savignano-form/master/status.svg)](https://david-dm.org/PaulSavignano/savignano-form/master)
[![DevDependencies](https://david-dm.org/PaulSavignano/savignano-form/master/dev-status.svg)](https://david-dm.org/PaulSavignano/savignano-form/master?type=dev)
[![PeerDependencies](https://david-dm.org/PaulSavignano/savignano-form/master/peer-status.svg)](https://david-dm.org/PaulSavignano/savignano-form/master?type=peer)
[![Patreon](https://img.shields.io/badge/patreon-support%20the%20author-blue.svg)](https://www.patreon.com/PaulSavignano)

</div>

Savignano-Form is a JavaScript library for managing form state.

* **Simple:** Components and hooks for all form elements.
* **Powerful:** Robust props supplied to field events and callbacks.
* **Performant:** Lightweight with a small bundle size.
<br />

## Table of Contents
- [Motivation](#motivation)
- [Installation](#installation)
- [Examples](#examples)
- [Contributing](#contributing)

## Motivation
* **Persist only whats rendered:** When a field is unmounted its value, error, and touched state are removed as well.  No additional work is required to keep forms state and rendered state insync.
* **Reduce bundle size:** Considerably less weight compared to alternatives.
* **Handle complex field interactions with ease:** Easily manage complex field interactions with callbacks. Provide a callback for a change and/or blur events and recieve the forms state and methods for use in interacting with other fields.  Form state and methods are also made available to validate, parse, and format functions.

## Installation
```
npm install savignano-form
```

## Usage with components

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  FormField,
  FormSubmit,
  FormReset
 } from 'savignano-form';

function App() {
  return (
    <Form onSubmit={(values) => makeApiRequest(values)}>
      <FormField component="input" label="Email" name="email" />
      <FormReset component="button">
        Reset
      </FormReset>
      <FormSubmit component="button">
        Submit
      </FormSubmit>
    </Form>
  );
}
```

## Or, roll your own components with hooks

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  useFormField,
  useFormReset,
  useFormSubmit
 } from 'savignano-form';

function Field({
  id,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate,
}) {
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
    type: 'text',
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

function Reset({ names, ...rest }) {
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

function Submit = ({
  children,
  disabled,
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
    if (isSubmitting) return 'Submitting...'
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

function App() {
  return (
    <Form onSubmit={(values) => makeApiRequest(values)}>
      <Field label="Email" name="email" />
      <Reset>Reset</Reset>
      <Submit>Submit</Submit>
    </Form>
  );
}
```

## Examples
[Codesandbox](https://codesandbox.io/s/savignano-form-rupo6?fontsize=14)
<iframe
     src="https://codesandbox.io/embed/savignano-form-rupo6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="savignano-form"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Contributing
- see CONTRIBUTING.md
