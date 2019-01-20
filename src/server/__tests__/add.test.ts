import { add } from '../add'
test(`resuts in zero when no arguments are supplied`, () => {
  expect(add()).toBe(0)
})

test(`results in three when 1 and 2 are added`, () => {
  expect(add(1, 2)).toBe(3)
})

test(`4 + 5 + 3 do not equal 10`, () => {
  expect(add(4, 5, 3)).not.toBe(10)
})
