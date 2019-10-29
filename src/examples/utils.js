export const fetchApi = ({ res, err }) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (err) return reject(err)
      return resolve(res)
    }, 2500)
  })
}

const isObject = obj => {
  const type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}