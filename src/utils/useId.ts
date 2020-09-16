import React, { useState, useEffect } from 'react'

/**
 * Private module for internal usage
 */
export default function useId(idOverride: any) {
  const [defaultId, setDefaultId] = useState(idOverride)
  const id = idOverride || defaultId

  useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the random value for client-side rendering only.
      // We can't use it server-side.
      setDefaultId(`mfcl-${Math.round(Math.random() * 1e5)}`)
    }
  }, [defaultId])

  return id
}
