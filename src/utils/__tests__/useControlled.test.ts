import { renderHook, act } from '@testing-library/react-hooks'
import useControlled from '../useControlled'

describe('useControlled', () => {
  it('works correctly when is not controlled', () => {
    const hook = renderHook(() => useControlled({ defaultValue: 1 }))

    expect(hook.result.current[0]).toEqual(1)

    act(() => {
      hook.result.current[1](2)
    })

    expect(hook.result.current[0]).toEqual(2)
  })

  it('works correctly when is controlled', () => {
    const hook = renderHook(() => useControlled({ controlled: 1 }))

    expect(hook.result.current[0]).toEqual(1)
  })
})
