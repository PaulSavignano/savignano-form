function classNames(...args) {
  const className = args.filter(Boolean).map(arg => arg).join(' ')
  return className
}

export default classNames