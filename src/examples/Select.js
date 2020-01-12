import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MuiSelect from '@material-ui/core/Select'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { useFormField } from '../lib'

const classNames = (...args) => args.filter(Boolean).map(arg => arg).join(' ')

const useStyles = makeStyles(theme => ({
  FormControl: {
    minWidth: 200,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

function Select({
  className,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate,
  style,
  options,
  id: idProp,
}) {
  const id = idProp || name
  const {
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
    type: 'select',
  })
  const classes = useStyles()
  return (
    <FormControl className={classNames(classes.FormControl, className)} error={error} style={style}>
      <InputLabel id={`label-${id}`}>{label}</InputLabel>
      <MuiSelect
        labelId={`label-${id}`}
        id={`select-${id}`}
        multiple
        value={value || []}
        onChange={({ target }) => onChange({ name, value: target.value && target.value.length ? target.value : undefined })}
        input={<Input id={id} />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(v => (
              <Chip key={v} label={v} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={{
          onExit: () => onBlur({ name, value })
        }}
      >
        {options.map(option => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText id={id}>{isTouched && error ? error : ' '}</FormHelperText>
    </FormControl>
  )
}

Select.defaultProps = {
  className: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  style: undefined
}

Select.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFormat: PropTypes.func,
  onParse: PropTypes.func,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
  style: PropTypes.instanceOf(Object),
}

export default Select
