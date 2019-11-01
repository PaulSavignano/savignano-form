import React, { useContext } from 'react'
import Context from '../lib/FormContext'

function ViewState() {
  const ctx = useContext(Context)
  return (
    <pre>{JSON.stringify(ctx, null, 2)}</pre>
  )
}

export default ViewState