import isFunction from './isFunction'

function handleEvent(e) {
  if (e && e.preventDefault && isFunction(e.preventDefault)) {
    e.preventDefault()
  }
  if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
    e.stopPropagation()
  }
}

export default handleEvent