import {getType} from '@/utils'

test('Array type should be Array', () => {
  expect(getType([1,2,3])).toBe('Array')
})
