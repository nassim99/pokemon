/* eslint-disable class-methods-use-this */

export default class {
  readonly root: Element | null;

  readonly rootMargin: string;

  readonly thresholds: ReadonlyArray<number>;

  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }

  disconnect(): undefined {
    return;
  }

  observe(): undefined {
    return;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): undefined {
    return;
  }
}
