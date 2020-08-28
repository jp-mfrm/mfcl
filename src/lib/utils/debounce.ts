// https://davidwalsh.name/javascript-debounce-function

function debounce(func: Function, wait: number, immediate = true) {
  let timeout: any

  return function executedFunction(...args: any[]) {
    // @ts-ignore
    const context = this

    // eslint-disable-next-line func-names
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

export default debounce
