import {ZipperList} from "./zipperlist"

test("Construction should be possible", () => {
  const z = new ZipperList([], 1, []);
  expect(z.cur).toStrictEqual(1);
})

test("Calling previous when there are no previous must not change current", () => {
  const z = new ZipperList([], 1, []);
  expect(z.cur).toStrictEqual(1);
  z.gotoPrev();
  expect(z.cur).toStrictEqual(1);
  expect(z.prev).toStrictEqual([]);
  expect(z.next).toStrictEqual([]);
})

test("Must be able to traverse: prev (happy path)", () => {
  const z = new ZipperList([1], 2, []);
  expect(z.cur).toStrictEqual(2);
  const z2 = z.gotoPrev();
  console.log(z2.prev);
  console.log(z2.cur);
  console.log(z2.next);
  expect(z2.cur).toStrictEqual(1);
  expect(z2.prev).toStrictEqual([]);
  expect(z2.next).toStrictEqual([2]);
  const z3 = z2.gotoPrev();
  expect(z3.cur).toStrictEqual(1);
  expect(z3.prev).toStrictEqual([]);
  expect(z3.next).toStrictEqual([2]);
})

test("Must be able to traverse: next", () => {
  let z = new ZipperList([], 1, [2]);
  expect(z.cur).toStrictEqual(1);
  z = z.gotoNext();
  expect(z.cur).toStrictEqual(2);
  expect(z.prev).toStrictEqual([1]);
  expect(z.next).toStrictEqual([]);
  z = z.gotoNext();
  expect(z.cur).toStrictEqual(2);
  expect(z.prev).toStrictEqual([1]);
  expect(z.next).toStrictEqual([]);
})

test("Must be able to append", () => {
  expect(true).toStrictEqual(false);
})

test("Must be remove", () => {
  expect(true).toStrictEqual(false);
})

test("Change value in current", () => {
  expect(true).toStrictEqual(false);
})

export {};
