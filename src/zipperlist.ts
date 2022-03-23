
// SOLID - Object Oriented 
//
// S - Single Responsibility ****
// O - Open for Extension / Closed for Modification
// L - Liskov Substitution
// I - Interface Segregration
// D - Dependency Inversion 
//
export class ZipperList<T> {
  constructor(public readonly prev: T[], public readonly cur: T, public readonly next: T[]) {}

  gotoPrev(): ZipperList<T> {
    const prevElem = this.prev[this.prev.length-1];
    if (prevElem === undefined) return this;
    return new ZipperList<T>(
      this.prev.slice(0, this.prev.length-1),
      prevElem,
      [this.cur, ...this.next],
    )
  }

  gotoNext() {
    const nextElement = this.next[0];
    if (nextElement === undefined) return this;
    return new ZipperList<T>(
      [...this.prev, this.cur],
      nextElement,
      this.next.slice(1)
    )
  }
}
