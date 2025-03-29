/**
 * Highly efficient sorting algorithm based on Radix and Bucket sorts
 * ADVANTAGES
 * * Super fast: 2x faster than radix sort, 5x faster than Array.prototype.sort()
 * * Can work with large volumes of numbers (radix and others might throw Max callstack errors)
 * LIMITATIONS:
 * * works only for non-negative numbers
 * * doesn't work properly with decimals (only natural numbers)
 * * current implementation works only with unique numbers
 */
export default class UniqueNumbersSort {
  constructor (chunkSize = 256) {
    this.chunkSize = chunkSize // Each chunk covers 'chunkSize' numbers

    /**
     * @type {Array<Uint8Array?>}
     */
    this.chunks = [] // Stores only used chunks in array for future indexing
  }

  /**
   * @param {Number} num
   */
  add (num) {
    const chunkIndex = num >>> 8 // num / 256
    const bitIndex = num & 255 // num % 256
    const byteIndex = bitIndex >>> 3 // bitIndex / 8
    const bitPosition = bitIndex & 7 // bitIndex % 8

    if (!this.chunks[chunkIndex])
      this.chunks[chunkIndex] = new Uint8Array(this.chunkSize / 8)

    this.chunks[chunkIndex][byteIndex] |= (1 << bitPosition)
  }

  getSorted () {
    const result = []

    for (let i = 0; i < this.chunks.length; i++) {
      const chunk = this.chunks[i]

      if (!chunk)
        continue

      for (let byteIndex = 0; byteIndex < chunk.length; byteIndex++) {
        const byte = chunk[byteIndex]

        if (byte === 0)
          continue

        for (let bitPosition = 0; bitPosition < 8; bitPosition++)
          if (byte & (1 << bitPosition))
            result.push((i << 8) + (byteIndex << 3) + bitPosition)
      }
    }

    return result
  }
}