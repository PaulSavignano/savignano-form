import handleEvent from './handleEvent'


describe('handleEvent', () => {
  it('should call preventDefault', () => {
    const spy = jest.fn()
    handleEvent({ preventDefault: spy })
    expect(spy).toHaveBeenCalled()
  })
  it('should call stopPropagation', () => {
    const spy = jest.fn()
    handleEvent({ stopPropagation: spy })
    expect(spy).toHaveBeenCalled()
  })
})