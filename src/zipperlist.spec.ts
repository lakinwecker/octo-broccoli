import {isSome, match} from "fp-ts/Option"
import {ZipperList, zipperList, next, prev, map, filter, toArray, fromArray} from "./zipperlist"

test("Construction should be possible", () => {
  const z = zipperList<number>([], 1, []);
  expect(z.cur).toStrictEqual(1);
})

test("Calling previous when there are no previous must not change current", () => {
  let z: ZipperList<number> = zipperList([], 1, []);
  expect(z.cur).toStrictEqual(1);
  z = prev(z);
  expect(z.cur).toStrictEqual(1);
  expect(z.prev).toStrictEqual([]);
  expect(z.next).toStrictEqual([]);
})

test("Must be able to traverse: prev (happy path)", () => {
  const z: ZipperList<number> = zipperList([1], 2, []);
  expect(z.cur).toStrictEqual(2);
  const z2 = prev(z);
  console.log(z2.prev);
  console.log(z2.cur);
  console.log(z2.next);
  expect(z2.cur).toStrictEqual(1);
  expect(z2.prev).toStrictEqual([]);
  expect(z2.next).toStrictEqual([2]);
  const z3 = prev(z2);
  expect(z3.cur).toStrictEqual(1);
  expect(z3.prev).toStrictEqual([]);
  expect(z3.next).toStrictEqual([2]);
})

test("Must be able to traverse: next", () => {
  let z: ZipperList<number> = zipperList([], 1, [2]);
  expect(z.cur).toStrictEqual(1);
  z = next(z);
  expect(z.cur).toStrictEqual(2);
  expect(z.prev).toStrictEqual([1]);
  expect(z.next).toStrictEqual([]);
  z = next(z);
  expect(z.cur).toStrictEqual(2);
  expect(z.prev).toStrictEqual([1]);
  expect(z.next).toStrictEqual([]);
})

test("map!!!", () => {
  let z: ZipperList<number> = zipperList([], 1, [2]);
  z = map((x: number) => x*x)(z);
  expect(z.prev).toStrictEqual([]);
  expect(z.cur).toStrictEqual(1);
  expect(z.next).toStrictEqual([4]);
})

test("filter", () => {
  const z: ZipperList<number> = zipperList([], 1, [2]);
  const z2 = filter((x: number) => x>1)(z);
  match(
    () => fail("Got an unexpected None"),
    (z2: ZipperList<number>) => {
      expect(z2.prev).toStrictEqual([]);
      expect(z2.cur).toStrictEqual(2);
      expect(z2.next).toStrictEqual([]);

    }
  )(z2)

  const z3 = filter((x: number) => x>2)(z);
  if (isSome(z3)) fail("This filter should have nothing");
})


test("toArray", () => {
  const z: ZipperList<number> = zipperList([1], 2, [3]);
  const z2 = toArray(z);
  expect(z2).toStrictEqual([1, 2, 3]);
})

test("fromArray", () => {
  const z = fromArray([1, 2, 3, 4], 1);
  match(
    () => fail("Got an unexpected None"),
    (z2: ZipperList<number>) => {
      expect(z2.prev).toStrictEqual([1]);
      expect(z2.cur).toStrictEqual(2);
      expect(z2.next).toStrictEqual([3, 4]);
    }
  )(z)
})


export {};
