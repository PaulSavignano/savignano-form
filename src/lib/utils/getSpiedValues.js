import getIn from './getIn'

const getSpiedValues = ({ names, values }) => {
  const spied = names.reduce((a, v) => {
    a[v] = getIn(values, v)
    return a
  }, {})
  return spied
}

export default getSpiedValues