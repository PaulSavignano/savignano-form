/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import {
  Form,
  FormReset,
  FormSpy,
  FormSubmit,
} from '../lib'

import './App.css'
import Checkbox from './Checkbox'
import FieldArray from './FieldArray'
import Radio from './Radio'
import Select from './Select'
import SubmitStateComponent from './SubmitStateComponent'
import Switch from './Switch'
import TextField from './TextField'
import ViewState from './ViewState'
import fetchApi from './fetchApi'
import { formatPhone, formatDollar } from './formatters'
import { parseDollar } from './parsers'
import { validateEmail, validatePhone, validateRequired } from './validators'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(1),
  },
  Typography: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  Card: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1)
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  TextField: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  field: {
    margin: theme.spacing(1)
  }
}))

const contactOptions = [
  { label: 'Select Type', value: undefined },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' }
]

const dayOptions = [
  { label: 'Sunday', value: 'sunday' },
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
]

function formValidate({ values, errors, setIn }) {
  const requiredFields = ['lastName']
  requiredFields.forEach(field => {
    if (!values[field]) {
      setIn(errors, field, 'Required')
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
    setPrice: false,
    role: 'fullStack',
  }
  const initialValues = {
    firstName: 'Paul',
    lastName: 'Savignano',
    price: 10000,
    libraries: [{ name: 'React' }, { name: 'Redux' }]
  }
  return (
    <Form
      onValidate={formValidate}
      defaultValues={defaultValues}
      initialValues={initialValues}
    >
      <main className={classes.main}>
        <Typography className={classes.Typography} align="center" variant="h4">
          Savignano-Form
        </Typography>

        <Card className={classes.Card} elevation={2}>
          <Typography className={classes.Typography} variant="h5">Simple</Typography>
          <div className={classes.padding}>
            <div className="row">
              <TextField
                className={classes.TextField}
                label="First Name"
                name="firstName"
              />
              <TextField
                className={classes.TextField}
                label="Last Name"
                name="lastName"
                onValidate={validateRequired}
              />
              <TextField
                className={classes.TextField}
                label="Email"
                name="email"
                onValidate={[validateRequired, validateEmail]}
              />
              <TextField
                className={classes.TextField}
                label="Phone"
                name="phone"
                onValidate={[validateRequired, validatePhone]}
                onFormat={formatPhone}
              />
              <TextField
                className={classes.TextField}
                label="Select Contact Method"
                name="contactMethod"
                onValidate={validateRequired}
                select
              >
                {contactOptions.map(option => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="row">
              <div className={classes.buttonContainer}>
                <FormReset
                  className={classes.button}
                  component={Button}
                  names={['firstName', 'lastName', 'phone', 'contactMethod', 'email']}
                  variant="contained"
                >
                  Partial Reset
                </FormReset>
              </div>
            </div>
          </div>
        </Card>

        <Card className={classes.Card} elevation={2}>
          <Typography className={classes.Typography} variant="h5">Spy on Values</Typography>
          <FormSpy names={['isAvailable', 'setPrice', 'setRole']}>
            {values => (
              <div className={classes.padding}>
                <div className="row">
                  <Checkbox
                    className={classes.field}
                    name="isAvailable"
                    label="Is Available"
                  />
                  {values.isAvailable ? (
                    <Select
                      name="availability"
                      label="Availability"
                      options={dayOptions}
                      onValidate={validateRequired}
                      className={classes.TextField}
                    />
                  ) : null}
                </div>
                <div className="row">
                  <Switch
                    className={classes.field}
                    label="Set Price"
                    name="setPrice"
                  />
                  {values.setPrice ? (
                    <TextField
                      label="Price"
                      name="price"
                      onValidate={validateRequired}
                      onFormat={formatDollar}
                      onParse={parseDollar}
                      className={classes.TextField}
                    />
                  ) : null}
                </div>
                <div className="row">
                  <Switch
                    className={classes.field}
                    label="Set Role"
                    name="setRole"
                  />
                  {values.setRole ? (
                    <>
                      <Radio
                        className={classes.field}
                        name="role"
                        label="Front End"
                        value="frontEnd"
                      />
                      <Radio
                        className={classes.field}
                        name="role"
                        label="Back End"
                        value="backEnd"
                      />
                      <Radio
                        className={classes.field}
                        name="role"
                        label="Full Stack"
                        value="fullStack"
                      />
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </FormSpy>
        </Card>

        <Card className={classes.Card} elevation={2}>
          <Typography className={classes.Typography} variant="h5">Field Array</Typography>
          <FieldArray name="libraries" label="Libraries" />
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
          <FormReset
            variant="contained"
            component={Button}
            className={classes.button}
          >
            Reset
          </FormReset>
        </div>
        <ViewState />
      </main>
    </Form>

  )
}

export default App
