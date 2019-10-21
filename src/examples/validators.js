export function validateEmail({ value }) {
  if (!value) return 'Required'
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return 'invalid email'
  return undefined
}

export function validateRequired({ value }) {
  if (!value) return 'Required'
  return undefined
}

export function validatePhone({ value }) {
  return value && value.replace(/\D+/g, '').length < 10
    ? 'Invalid phone number, must be 10 digits'
    : undefined
}
