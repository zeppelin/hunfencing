export const toggle = <T extends unknown>(arr: T[], val: T, keepWhenLast = false): T[] => {
  if (keepWhenLast && arr.length === 1 && arr[0] === val) {
    return arr;
  }

  if (arr.includes(val)) {
    return arr.filter((v) => v !== val).sort();
  } else {
    return arr.concat([val]).sort();
  }
};
