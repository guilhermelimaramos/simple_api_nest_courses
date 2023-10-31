export function add(x: number, y:number) {
  return x + y;
}

describe('Initial test', () => {
  test('add function', () => {
    expect(add(5, 10)).toEqual(15)
  })
})