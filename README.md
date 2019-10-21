<h1 align="center">Savignano-Form</h1>

<div align="center">

Manage form state with React Components.

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

* **Simple:** Components for all form elements.
* **Powerful:** Form fields interact with other fields.
* **Performant:** Eliminates re-renders of your components.  Only the field acted upon re-renders
<br />

## Installation
```
npm install savignano-form
```

## Usage
Here is an example to get you started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
 } from 'savignano-flex';

function App() {
  return (
    <Form onSubmit={() => console.log('Submitted!')}>

    </Form>
  );
}
```

## Examples
[Codesandbox](https://codesandbox.io/s/savignano-form?fontsize=14)

## Contributing
- see CONTRIBUTING.md
# savignano-form
