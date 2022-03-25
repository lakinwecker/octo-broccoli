import {Option, some, none, match} from "fp-ts/Option"
import {identity} from "fp-ts/function"

// SOLID - Object Oriented 
//
// S - Single Responsibility ****
// O - Open for Extension / Closed for Modification
// L - Liskov Substitution
// I - Interface Segregration
// D - Dependency Inversion 

export type ZipperList<T> = {
  readonly prev: readonly T[];
  readonly cur: T;
  readonly next: readonly T[];
}

export const zipperList = <T>(prev: T[], cur: T, next: T[]) => {
  return {prev, cur, next};
}

export const toArray = <T>(z: ZipperList<T>): Array<T> => [...z.prev, z.cur, ...z.next];
export const fromArray = <T>(a: Array<T>, i: number): Option<ZipperList<T>> => {
  if (a.length === 0) return none;

  if (i >= a.length) return fromArray(a, a.length-1);
  if (i < 0) return fromArray(a, 0);

  const cur = a[i] as T;
  return some({
    prev: a.slice(0, i),
    cur, 
    next: a.slice(i + 1, a.length)
  })
}

const orDefault = <T>(d: ZipperList<T>) =>
  match<ZipperList<T>, ZipperList<T>>(
    () => d, // None
    identity // Contained
  )

export const prev = <T>(z: ZipperList<T>): ZipperList<T> => 
  orDefault(z)(fromArray(toArray(z), z.prev.length-1));

export const next = <T>(z: ZipperList<T>): ZipperList<T> => 
  orDefault(z)(fromArray(toArray(z), z.prev.length+1));

export const map = <T, T2>(f: (t: T) => T2) => (z: ZipperList<T>): ZipperList<T2> => {
  return {
    prev: z.prev.map(f),
    cur: f(z.cur),
    next: z.next.map(f)
  }
}

export const filter = <T>(f: (t: T) => boolean) => (z: ZipperList<T>): Option<ZipperList<T>> => 
  fromArray(toArray(z).filter(f), z.prev.length);
