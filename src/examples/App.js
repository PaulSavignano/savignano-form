import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import MenuItem from '@material-ui/core/MenuItem'

import {
  Form,
  FormField,
  FormFieldArray,
  FormSpy,
  FormReset,
  FormSubmit,
} from '../lib'

import FieldArray from './FieldArray'
import FieldCheckbox from './FieldCheckbox'
import FieldRadio from './FieldRadio'
import FieldSwitch from './FieldSwitch'
import FieldText from './FieldText'
import SubmitStateComponent from './SubmitStateComponent'
import ViewState from './ViewState'
import fetchApi from './fetchApi'
import { formatPhone, formatDollar } from './formatters'
import { parseDollar } from './parsers'
import { validateEmail, validateRequired } from './validators'

const useStyles = makeStyles(theme => ({
  h3: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  main: {
    padding: 4,
    display: 'flex',
    flexFlow: 'column',
  },
  buttonContainer: {
    padding: 4,
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    margin: 4,
  },
  input: {
    display: 'none'
  },
  switch: {
    width: '100%'
  },
  FormField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center'
  },
}))

const selectOptions = [
  { label: 'Select Type', value: undefined },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' }
]

function validate({ values }) {
  const errors = {}
  const requiredFields = ['lastName']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

async function handleSubmit(values) {
  try {
    const res = await fetchApi({ res: values, err: '' })
    console.log('handleSubmit res: ', res)
  } catch (error) {
    console.log('handleSubmit err: ', error)
  }
}

function App() {
  const classes = useStyles()
  const defaultValues = {
    role: 'mother',
    lastName: ''
  }
  const initialValues = {
    firstName: 'Paul',
    isPrice: true,
    phone: '444',
    price: 10,
    email: 'paul@gmail.com',
    children: [{ name: 'Weston' }]
  }
  return (
    <Form
      onValidate={validate}
      defaultValues={defaultValues}
      initialValues={initialValues}
    >
      <main className={classes.main}>
        <div className={classes.h3}>
          <Typography variant="h3">Savignano-Form</Typography>
        </div>
        <Card className={classes.Card}>
          <Typography variant="h4">Simple</Typography>
          <div className={classes.row}>
            <FormField
              className={classes.FormField}
              component={FieldText}
              label="First Name"
              name="firstName"
            />
            <FormField
              className={classes.FormField}
              component={FieldText}
              label="Last Name"
              name="lastName"
              onValidate={validateRequired}
            />
            <FormField
              className={classes.FormField}
              component={FieldText}
              label="Email"
              name="email"
              onValidate={[validateRequired, validateEmail]}
            />
            <FormField
              className={classes.FormField}
              component={FieldText}
              label="Phone"
              name="phone"
              onValidate={validateRequired}
              onFormat={formatPhone}
              isPersistOnUnmount={false}
            />
            <FormField
              className={classes.FormField}
              component={FieldText}
              label="Select Contact Method"
              name="contactMethod"
              onValidate={validateRequired}
              isPersistOnUnmount={false}
              select
            >
              {selectOptions.map(option => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </FormField>
            <FormReset
              variant="contained"
              component={Button}
              names={['firstName', 'lastName', 'email', 'phone']}
            >
              Reset Values
            </FormReset>
          </div>
        </Card>

        <Card className={classes.Card}>
          <Typography variant="h4">Spy on Values</Typography>
          <div className={classes.row}>
            <FormField
              className={classes.FormField}
              component={FieldSwitch}
              label="Is Price"
              name="isPrice"
              type="checkbox"
            />
            <FormSpy names={['isPrice']}>
              {values => {
                if (values.isPrice) {
                  return (
                    <>
                      <FormField
                        component={FieldText}
                        label="Price"
                        name="price"
                        onValidate={validateRequired}
                        onFormat={formatDollar}
                        onParse={parseDollar}
                      />
                    </>
                  )
                }
                return null
              }}
            </FormSpy>
          </div>
          <div className={classes.row}>
            <FormField
              className={classes.FormField}
              component={FieldSwitch}
              label="Is Role"
              name="isRole"
              type="checkbox"
            />
            <FormSpy names={['isRole']}>
              {values => {
                if (values.isRole) {
                  return (
                    <>
                      <Typography>Role</Typography>
                      <FormField
                        className={classes.FormField}
                        component={FieldRadio}
                        name="role"
                        label="mother"
                        type="radio"
                        value="mother"
                      />
                      <FormField
                        className={classes.FormField}
                        component={FieldRadio}
                        name="role"
                        label="father"
                        type="radio"
                        value="father"
                      />
                      <FormField
                        className={classes.FormField}
                        component={FieldRadio}
                        name="role"
                        label="son"
                        type="radio"
                        value="son"
                      />
                      <FormField
                        className={classes.FormField}
                        component={FieldRadio}
                        name="role"
                        label="daughter"
                        type="radio"
                        value="daughter"
                      />
                    </>
                  )
                }
                return null
              }}
            </FormSpy>
          </div>
          <div className={classes.row}>
            <Typography>Has Dog</Typography>
            <FormField
              className={classes.FormField}
              component={FieldCheckbox}
              name="hasDog"
              type="checkbox"
            />
          </div>
        </Card>



        <Card className={classes.Card}>
          <Typography variant="h4">Field Array</Typography>
          <div className={classes.row}>
            <Typography>Children</Typography>
            <FormFieldArray name="children" component={FieldArray} />
          </div>
        </Card>

        <div className={classes.buttonContainer}>
          <FormSubmit
            variant="contained"
            color="primary"
            component={Button}
            onClick={handleSubmit}
            submitStateComponent={SubmitStateComponent}
            className={classes.button}
            type="button"
          >
            Submit
          </FormSubmit>
          <FormReset variant="contained" component={Button} className={classes.button}>
            Reset
          </FormReset>
        </div>
        <ViewState />
      </main>
    </Form>
  )
}

App.propTypes = {
  classes: PropTypes.shape(Object).isRequired
}

export default App
