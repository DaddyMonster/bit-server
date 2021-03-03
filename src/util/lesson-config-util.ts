export const getHiddenTok = (lv: number) => {
  return lv / 10 - 0.1;
};

export function hasItem<T>(arr: T[], target: T) {
  return arr.includes(target);
}
