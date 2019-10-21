import getPath from './getPath'

describe('getPath', () => {
  it('should return empty array when name is empty', () => {
    expect(getPath(undefined)).toEqual([])
    expect(getPath(null)).toEqual([])
    expect(getPath('')).toEqual([])
  })

  it('should throw an error if name is not a string', () => {
    const pattern = /expects a string/
    expect(() => getPath(['not', 'a', 'string'])).toThrow(pattern)
  })

  it('should split on dots', () => {
    expect(getPath('info.email.work')).toEqual(['info', 'email', 'work'])
  })

  it('should split on brackets', () => {
    expect(getPath('foo[1].bar')).toEqual(['foo', '1', 'bar'])
    expect(getPath('foo[1].bar[4]')).toEqual(['foo', '1', 'bar', '4'])
    expect(getPath('foo[1][2][3].bar[4].cow')).toEqual([
      'foo',
      '1',
      '2',
      '3',
      'bar',
      '4',
      'cow'
    ])
  })
})
