import { keyBy } from "lodash";
import { Phases } from "../enums";

export const getHiddenTok = (lv: number) => {
  return lv / 10 - 0.1;
};

export function hasItem<T>(arr: T[], target: T) {
  return arr.indexOf(target) !== -1;
}

export function allTrue(arr: any[]) {
  return !arr.some((x) => !Boolean(x));
}

export function rangeIndexParser([start, end]: [number, number]) {
  let arr = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
}

export function mapByPhase<T extends { phase: Phases }>(items: T[]) {
  return keyBy(items, (item) => item.phase);
}
