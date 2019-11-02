function fetchApi({
  res,
  err,
  timeout = 2000,
}) {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (err) return reject(err)
      return resolve(res)
    }, timeout)
  })
}

export default fetchApi