import { useEffect, useState } from 'react'
import useForwardedRef from './useForwardedRef'

const useRefHasValue = <T>(ref: any, value: any) => {
  const [hasValue, setHasValue] = useState(false)
  const forwardedRef = useForwardedRef<T>(ref)

  useEffect(() => {
    // @ts-ignore
    if (forwardedRef?.current?.value) {
      setHasValue(true)
      // @ts-ignore
    } else if (!forwardedRef?.current?.value || !value) {
      setHasValue(false)
    }
    // @ts-ignore
  }, [forwardedRef?.current?.value, value])

  return {
    forwardedRef,
    hasValue,
    setHasValue
  }
}

export default useRefHasValue
