import React from 'react'
import PropTypes from 'prop-types'
import MuiSelect from '@material-ui/core/Select'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import FormHelperText from '@material-ui/core/FormHelperText'

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
  InputProps,
  SelectProps,
  children,
  className,
  label,
  name,
  onBlur: onBlurCallback,
  onChange: onChangeCallback,
  onFormat,
  onParse,
  onValidate,
  select,
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
    <FormControl className={classNames(classes.FormControl, className)} error={error}>
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
  SelectProps: undefined,
  children: undefined,
  className: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFormat: undefined,
  onParse: undefined,
  onValidate: undefined,
  select: false,
}

Select.propTypes = {
  SelectProps: PropTypes.instanceOf(Object),
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFormat: PropTypes.func,
  onParse: PropTypes.func,
  onValidate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
  select: PropTypes.bool,
}

export default Select
