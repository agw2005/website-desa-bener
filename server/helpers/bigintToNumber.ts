export const bigintToNumber = <T extends object>(
  row: T,
  fields: (keyof T)[],
): T => {
  const result = { ...row };
  for (const field of fields) {
    if (typeof result[field] === "bigint") {
      result[field] = Number(result[field]) as T[keyof T];
    }
  }
  return result;
};
