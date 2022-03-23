
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
export const fromArray = <T>(a: Array<T>, i: number): ZipperList<T> | undefined => {
  if (a.length === 0) return undefined;

  if (i >= a.length) return fromArray(a, a.length-1);
  if (i < 0) return fromArray(a, 0);

  const cur = a[i] as T;
  return {
    prev: a.slice(0, i),
    cur, 
    next: a.slice(i + 1, a.length)
  }
}

export const prev = <T>(z: ZipperList<T>): ZipperList<T> => {
  const p = fromArray(toArray(z), z.prev.length-1);
  if (p === undefined) return z;
  return p;
}

export const next = <T>(z: ZipperList<T>): ZipperList<T> => {
  const p = fromArray(toArray(z), z.prev.length+1);
  if (p === undefined) return z;
  return p;
}

export const map = <T, T2>(f: (t: T) => T2) => (z: ZipperList<T>): ZipperList<T2> => {
  return {
    prev: z.prev.map(f),
    cur: f(z.cur),
    next: z.next.map(f)
  }
}

export const filter = <T>(f: (t: T) => boolean) => (z: ZipperList<T>): ZipperList<T> | undefined => {
  const a = toArray(z).filter(f);
  const i = z.prev.length;
  return fromArray(a, i);
}
