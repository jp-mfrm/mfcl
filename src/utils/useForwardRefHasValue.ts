import React, { useEffect, useState } from 'react'
import useForwardedRef from './useForwardedRef'

const useRefHasValue = <T>(ref: any) => {
  const [hasValue, setHasValue] = useState(false)
  const forwardedRef = useForwardedRef<T>(ref)

  useEffect(() => {
    // @ts-ignore
    if (forwardedRef?.current?.value) {
      setHasValue(true)
    }
    // @ts-ignore
  }, [forwardedRef?.current?.value])

  return {
    forwardedRef,
    hasValue,
    setHasValue
  }
}

export default useRefHasValue
