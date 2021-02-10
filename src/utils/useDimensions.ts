// code taken from https://github.com/craig1123/react-recipes/blob/master/src/useDimensions.js
import { useState, useCallback, useLayoutEffect } from 'react'
import debounce from './debounce'

function useDimensions(liveMeasure = true, delay = 250, initialDimensions = {}, effectDeps = []) {
  const [dimensions, setDimensions] = useState(initialDimensions)
  const [node, setNode] = useState<any>(null)

  const ref = useCallback((newNode) => {
    setNode(newNode)
  }, [])

  useLayoutEffect(() => {
    // need ref to continue
    if (!node) {
      return
    }

    const measure = () => {
      window.requestAnimationFrame(() => {
        const newDimensions = node.getBoundingClientRect()
        setDimensions(newDimensions)
      })
    }
    // invoke measure right away
    measure()

    if (liveMeasure) {
      const debounceMeasure = debounce(measure, delay)

      window.addEventListener('resize', debounceMeasure)
      window.addEventListener('scroll', debounceMeasure)

      return () => {
        window.removeEventListener('resize', debounceMeasure)
        window.removeEventListener('scroll', debounceMeasure)
      }
    }
  }, [node, liveMeasure, ...effectDeps])

  return [ref, dimensions, node]
}

export default useDimensions

// Usage

// function App() {
//   const [wrapperRef, dimensions] = useDimensions();

//   return (
//     <div ref={wrapperRef}>
//       height: {dimensions.height}
//       width: {dimensions.width}
//     </div>
//   );
// }
