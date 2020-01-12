/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button"
import makeStyles from '@material-ui/core/styles/makeStyles'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import TextField from './TextField'
import { useFormFieldArray } from '../lib'
import { validateRequired } from './validators'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  item: {
    margin: theme.spacing(1),
  },
}))


function FieldArray({ label, name }) {
  const {
    onChange,
    onDelete,
    onPop,
    onPush,
    onShift,
    onUnshift,
    values,
  } = useFormFieldArray({ name })
  const classes = useStyles()
  const { length } = values
  return useMemo(() => {
    return (
      <div className={classes.root}>
        <Button
          className={classes.item}
          color="primary"
          onClick={() => onUnshift({})}
          startIcon={<AddIcon />}
          variant="contained"
        >
          {label}
        </Button>
        {length && values.map((v, i) => (
          <TextField
            key={`${name} ${i}`}
            className={classes.item}
            name={`${name}.${i}.name`}
            label={`${name} ${i + 1}`}
            id={`${name} ${i}`}
            onValidate={[validateRequired]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={`${name} delete ${i}`}
                    onClick={() => onDelete(i)}
                  >
                    <CancelIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        ))}
      </div>
    )

  }, [classes.item, classes.root, label, length, name, onDelete, onUnshift, values])
}

FieldArray.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default FieldArray
