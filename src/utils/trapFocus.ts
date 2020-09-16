const trapFocus = (e: any, ref: any) => {
  const focusableModalElements = ref.current.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  )

  const firstFocusableEl = focusableModalElements[0]
  const lastFocusableEl = focusableModalElements[focusableModalElements.length - 1]

  if (e.shiftKey) {
    /* shift tab keypress */
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus()
      e.preventDefault()
    }
  } /* tab keypress */ else if (document.activeElement === lastFocusableEl) {
    firstFocusableEl.focus()
    e.preventDefault()
  }
}

export default trapFocus;