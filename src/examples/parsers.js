export const parseDollar = value => {
  if (!value) return value
  const onlyNums = value.replace(/[^\d]/g, '')
  const int = parseInt(onlyNums, 10)
  return int
}
