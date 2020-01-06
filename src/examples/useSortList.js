import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const useDnDList = (props) => {
  const [items, setItems] = useState(props.items || [])

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  const handleMove = (dragIndex, hoverIndex) => {
    const dragId = items[dragIndex]
    const newIds = [...items]
    newIds.splice(dragIndex, 1)
    newIds.splice(hoverIndex, 0, dragId)
    setItems(newIds)
  }

  return {
    items,
    onMove: handleMove,
  }
}

export default useDnDList