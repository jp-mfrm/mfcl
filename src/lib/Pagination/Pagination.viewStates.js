export const getLastChunkPage = (pagesLeft, { activePage, chunkSize, totalPages, isMobile }) => {
  // last in pages chunk loop: 1,...,3,4,5 (active),6,>7<,...,20
  let lastChunkPage
  if (activePage <= chunkSize) {
    // When there's only one ellipsis at the end, account for both ellipsis and last page
    lastChunkPage = isMobile ? chunkSize : chunkSize + 2
  } else if (pagesLeft > chunkSize) {
    // account for both ellipsis
    lastChunkPage = activePage + (chunkSize - Math.ceil(chunkSize / 2))
  } else if (isMobile && pagesLeft >= chunkSize) {
    lastChunkPage = activePage + (chunkSize - Math.ceil(chunkSize / 2))
  } else {
    lastChunkPage = totalPages
  }
  return lastChunkPage
}

export const getFirstChunkPage = (pagesLeft, { activePage, totalPages, chunkSize, isMobile }) => {
  let firstChunkPage
  if (activePage <= chunkSize) {
    firstChunkPage = 1
  } else if (isMobile && pagesLeft < chunkSize) {
    firstChunkPage = totalPages - chunkSize + 1
  } else if (pagesLeft <= chunkSize) {
    firstChunkPage = isMobile ? activePage - (Math.ceil(chunkSize / 2) - 1) : totalPages - chunkSize - 1
  } else {
    firstChunkPage = activePage - (Math.ceil(chunkSize / 2) - 1)
  }
  return firstChunkPage
}
