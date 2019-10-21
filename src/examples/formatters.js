export const formatDollar = value => {
  if (!value && value !== 0) return ''
  return `$${(value / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const formatPhone = value => {
  if (!value) return ''
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) return onlyNums
  if (onlyNums.length < 7) return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3)}`
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}
