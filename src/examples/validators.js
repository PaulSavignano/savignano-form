export function validateEmail({ value }) {
  if (!value) return undefined
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return undefined
  return 'Invalid email'
}

export function validateRequired({ value }) {
  if (!value) return 'Required'
  return undefined
}

export function validatePhone({ value }) {
  if (!value) return undefined
  if (value.replace(/\D+/g, '').length < 10) {
    return 'Phone number must be 10 digits'
  }
  return undefined
}
