export const hexToRgb = (value: string, opacity: number) => {
  const hex = value.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b}, ${opacity})`;
};
