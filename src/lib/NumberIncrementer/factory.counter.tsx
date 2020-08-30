export function createCounterSubtractFactory(n: number) {
  if (n <= 1) {
    n = 0
  }

  if (n > 1) {
    n = n - 1
  }

  return n
}

export function createCounterAddFactory(n: number) {
  return n + 1
}
