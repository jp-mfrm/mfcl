export function createFactoryCounter(number: number, math: 'add' | 'subtract') {
  if (math === 'subtract') {
    if (number <= 1) {
      number = 0
    }

    if (number > 1) {
      number = number - 1
    }
  }

  if (math === 'add') {
    number = number + 1
  }

  return number
}
