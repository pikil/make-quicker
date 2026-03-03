import UniqueNumbersSort from './utils/UniqueNumbersSort'

/**
 * Sorts natural positive numbers very efficiently
 * @param {number[]} arr
 */
export const sortUniqueNumbers = (arr) => {
    const sorter = new UniqueNumbersSort()
    const { length } = arr
    let i = 0

    while (i < length) {
        sorter.add(arr[i])
        i++
    }

    return sorter.getSorted()
}
