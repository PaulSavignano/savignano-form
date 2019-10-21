import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function FieldSwitch(props) {
  const { className, label, name, onChange, value, ...rest } = props
  return (
    <FormControlLabel
      className={className}
      control={<Switch checked={value} name={name} onChange={onChange} />}
      label={label}
    />
  )
}

export default FieldSwitch
