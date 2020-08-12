import '@testing-library/jest-dom/extend-expect'

const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

global.requestAnimationFrame = (cb) => {
  cb(0)
}

global.window.cancelAnimationFrame = () => {}

global.createSpyObj = (baseName, methodNames) => {
  const obj = {}

  for (let i = 0; i < methodNames.length; i += 1) {
    obj[methodNames[i]] = jest.fn()
  }

  return obj
}

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {}
})

global.window.URL.createObjectURL = () => {}
