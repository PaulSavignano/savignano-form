import React from 'react'
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button"

import FormField from '../lib/FormField'
import FieldText from './FieldText'

function FieldArray({
  name,
  onAdd,
  onChange,
  onDelete,
  value
}) {
  return (
    <div style={{ margin: 16 }}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAdd({
            name: undefined
          })}
        >
          Add
        </Button>
      </div>

      {value.map((v, i) => {
        return (
          <div
            key={`${name} ${i}`}
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center"
            }}
          >
            <FormField
              name={`${name}.${i}.name`}
              component={FieldText}
              label={`${name} ${i}`}
              id={`${name} ${i}`}
            />
            <Button
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
  )
}

FieldArray.propTypes = {
  error: PropTypes.string
}

export default FieldArray
