import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

import Form from '../lib/Form'
import FormField from '../lib/FormField'
import FieldArray from './FieldArray'
import FormFieldArray from '../lib/FormFieldArray'
import FormSpy from '../lib/FormSpy'
import FieldCheckbox from './FieldCheckbox'
import FieldText from './FieldText'
import FieldSwitch from './FieldSwitch'
import FieldRadio from './FieldRadio'
import FormReset from '../lib/FormReset'
import FormSubmit from '../lib/FormSubmit'
import { fetchApi } from './utils'
import { validateEmail, validateRequired } from './validators'
import { formatPhone, formatDollar } from './formatters'
import { parseDollar } from './parsers'

const styles = theme => ({
  h3: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card: {
    margin: 8,
    padding: 8,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center'
  },

})

export const defaultValues = {
  role: 'mother',
  lastName: ''
}

export const initialValues = {
  firstName: 'Paul',
  isPrice: true,
  phone: '444',
  price: 10,

}

class App extends Component {
  state = {
    error: '',
    res: {}
  }

  handleSubmit = values => {
    return fetchApi({
      res: values,
      err: 'did not make it'
    })
      .then(res => {
        console.log('submitted values!', values)
        this.setState({ res })
      })
      .catch(error => {
        console.log('my handleSubmit error ', error)
        this.setState({ error })
      })
  }

  render() {
    const { classes } = this.props
    return (

      <Form
        onSubmit={this.handleSubmit}
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
                component={FieldText}
                label="First Name"
                name="firstName"
              />
              <FormField component={FieldText} label="Last Name" name="lastName" />
              <FormField
                component={FieldText}
                label="Email"
                name="email"
                onValidate={[validateRequired, validateEmail]}
              />
              <FormField
                component={FieldText}
                label="Phone"
                name="phone"
                onValidate={validateRequired}
                onFormat={formatPhone}
                isPersistOnUnmount={false}
              />
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
                component={FieldSwitch}
                label="Is Role"
                name="isRole"
                type="checkbox"
              />
              <FormSpy names={['isRole']}>
                {values => (
                  <>
                    <Typography>Role</Typography>
                    <FormField
                      component={FieldRadio}
                      name="role"
                      label="mother"
                      type="radio"
                      value="mother"
                    />
                    <FormField
                      component={FieldRadio}
                      name="role"
                      label="father"
                      type="radio"
                      value="father"
                    />
                    <FormField
                      component={FieldRadio}
                      name="role"
                      label="son"
                      type="radio"
                      value="son"
                    />
                    <FormField
                      component={FieldRadio}
                      name="role"
                      label="daughter"
                      type="radio"
                      value="daughter"
                    />
                  </>
                )}
              </FormSpy>
            </div>
            <div className={classes.row}>
              <Typography>Has Dog</Typography>
              <FormField component={FieldCheckbox} name="hasDog" type="checkbox" />
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
              isDisplayState
              className={classes.button}
            >
              Submit
            </FormSubmit>
            <FormReset variant="contained" component={Button} className={classes.button}>
              Reset
            </FormReset>
          </div>
        </main>
      </Form>
    )
  }
}

App.propTypes = {
  classes: PropTypes.shape(Object).isRequired
}

export default withStyles(styles)(App)
