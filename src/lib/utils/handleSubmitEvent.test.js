import handleSubmitEvent from './handleSubmitEvent'


describe('handleSubmitEvent', () => {
  it('should call preventDefault', () => {
    const spy = jest.fn()
    handleSubmitEvent({ preventDefault: spy })
    expect(spy).toHaveBeenCalled()
  })
  it('should call stopPropagation', () => {
    const spy = jest.fn()
    handleSubmitEvent({ stopPropagation: spy })
    expect(spy).toHaveBeenCalled()
  })
})