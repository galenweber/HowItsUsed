import { Hit, HitsStructured, HitsSorted } from '../types';

interface SetCache {
  searchTerm: string;
  hitsStructured: HitsStructured;
  hitsSorted: HitsSorted;
}

let cache: SetCache | undefined;

export function setCache(update: SetCache) {
  cache = update;
}

export function getCache() {
  return cache;
}