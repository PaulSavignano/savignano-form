import React from 'react'
import PropTypes from 'prop-types'
import MuiChip from '@material-ui/core/Chip'

const Chip = ({ onDelete, label }) => {
  return (
    <MuiChip
      label={label}
      onDelete={onDelete}
    />
  )
}

Chip.propTypes = {
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default Chip