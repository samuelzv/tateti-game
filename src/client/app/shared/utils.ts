
export function isNullOrEmpty(object: any) {
  return !object || Object.keys(object).length === 0;
}
