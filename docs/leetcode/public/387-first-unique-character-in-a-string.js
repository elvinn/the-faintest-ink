/**
 * https://leetcode.com/problems/first-unique-character-in-a-string/
 *
 * Type: String
 * Difficulty: Easy
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

import test from 'ava'

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s = '') {
  const hashMap = new Map()
  s.split('').forEach((char, index) => {
    if (hashMap.has(char)) {
      hashMap.set(char, Number.MAX_SAFE_INTEGER)
    } else {
      hashMap.set(char, index)
    }
  })
  let firstUniqCharIndex = Number.MAX_SAFE_INTEGER
  for (const index of hashMap.values()) {
    if (index < firstUniqCharIndex) {
      firstUniqCharIndex = index
    }
  }

  if (firstUniqCharIndex === Number.MAX_SAFE_INTEGER) {
    return -1
  }

  return firstUniqCharIndex
}

function main () {
  const testList = [
    {
      testData: 'leetcode',
      result: 0
    },
    {
      testData: 'loveleetcode',
      result: 2
    },
    {
      testData: 'll',
      result: -1
    },
    {
      testData: '',
      result: -1
    }
  ]

  for (const { testData, result } of testList) {
    test(JSON.stringify(testData), t => {
      t.is(firstUniqChar(testData), result)
    })
  }
}

main()
