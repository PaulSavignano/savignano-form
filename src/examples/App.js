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
import FieldArray from './FieldArray'
import Checkbox from './Checkbox'
import Radio from './Radio'
import Switch from './Switch'
import TextField from './TextField'
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
  formField: {
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

function validate({ values, errors, setIn }) {
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
        <Typography
          className={classes.h3}
          variant="h3"
        >
          Savignano-Form
        </Typography>
        <Card className={classes.Card}>
          <Typography variant="h4">Simple</Typography>
          <div className={classes.row}>
            <TextField
              className={classes.formField}
              label="First Name"
              name="firstName"
            />
            <TextField
              className={classes.formField}
              label="Last Name"
              name="lastName"
              onValidate={validateRequired}
            />
            <TextField
              className={classes.formField}
              label="Email"
              name="email"
              onValidate={[validateRequired, validateEmail]}
            />
            <TextField
              className={classes.formField}
              label="Phone"
              name="phone"
              onValidate={validateRequired}
              onFormat={formatPhone}
              isPersistOnUnmount={false}
            />
            <TextField
              className={classes.formField}
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
            </TextField>
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
            <Switch
              className={classes.formField}
              label="Is Price"
              name="isPrice"
              type="checkbox"
            />
            <FormSpy names={['isPrice']}>
              {values => {
                if (values.isPrice) {
                  return (
                    <>
                      <TextField
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
            <Switch
              className={classes.formField}
              label="Is Role"
              name="isRole"
            />
            <FormSpy names={['isRole']}>
              {values => {
                if (values.isRole) {
                  return (
                    <>
                      <Radio
                        name="role"
                        label="mother"
                        value="mother"
                      />
                      <Radio
                        name="role"
                        label="father"
                        value="father"
                      />
                      <Radio
                        name="role"
                        label="son"
                        value="son"
                      />
                      <Radio
                        name="role"
                        label="daughter"
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
            <Checkbox
              className={classes.formField}
              name="hasDog"
              label="Has Dog"
              type="checkbox"
            />
          </div>
        </Card>
        <Card className={classes.Card}>
          <Typography variant="h4">Field Array</Typography>
          <FieldArray name="children" label="Children" />
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
