/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { useFormFieldArray } from '../lib'
import TextField from './TextField'
import { validateRequired } from './validators'

const useStyles = makeStyles(theme => ({
  itemContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  item: {
    margin: theme.spacing(1),
  },
}))

function FieldArray({ label, name }) {
  const {
    onAdd,
    onChange,
    onDelete,
    value
  } = useFormFieldArray({ name })
  const classes = useStyles()
  return (
    <div>
      <div className={classes.itemContainer}>
        <Typography
          className={classes.item}
        >
          {label}
        </Typography>
        <Button
          className={classes.item}
          variant="contained"
          color="primary"
          onClick={onAdd}
        >
          Add
        </Button>
      </div>
      <div>
        {value.map((v, i) => {
          return (
            <div
              key={`${name} ${i}`}
              className={classes.itemContainer}
            >
              <TextField
                className={classes.item}
                name={`${name}.${i}.name`}
                label={`${name} ${i}`}
                id={`${name} ${i}`}
                onValidate={validateRequired}
              />
              <Button
                className={classes.item}
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => onDelete(i)}
              >
                X
              </Button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

FieldArray.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default FieldArray
