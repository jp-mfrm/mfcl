import mattressIpsum from 'mattress-ipsum'

export default [
  {
    header: (
      <div data-index={0}>
        <div data-index={0}>
          Step 1
        </div>
        <div data-index={0}>
          Sleep Style
        </div>
      </div>
    ),
    content: mattressIpsum(1)
  },
  {
    header: (
      <div data-index={1}>
        <div data-index={1}>
          Step 2
        </div>
        <div data-index={1}>
          Mattress
        </div>
      </div>
    ),
    content: mattressIpsum(1)
  },
  {
    header: (
      <div data-index={2}>
        <div data-index={2}>
          Step 3
        </div>
        <div data-index={2}>
          Foundation
        </div>
      </div>
    ),
    content: mattressIpsum(1)
  },
  {
    header: (
      <div data-index={3}>
        <div data-index={3}>
          Step 4
        </div>
        <div data-index={3}>
          Bedding
        </div>
      </div>
    ),
    content: mattressIpsum(1)
  }
]