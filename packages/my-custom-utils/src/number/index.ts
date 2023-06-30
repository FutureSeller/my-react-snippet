export const toFixedRound = (value: number, precision = 1) => {
  const factor = Math.pow(10, precision);
  const roundedValue = Math.round(value * factor) / factor;
  return roundedValue.toFixed(precision);
};

export const toFixedTrunc = (value: number, precision = 1) => {
  const factor = Math.pow(10, precision);
  return Math.floor(value * factor) / factor;
};

export const addDelimiter = (value: number, delimiter = ",") => {
  const stringifiedValue = value.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  if (Number.isInteger(value)) {
    return stringifiedValue.replace(regex, delimiter);
  }

  const parts = stringifiedValue.split(".");
  parts[0] = parts[0].replace(regex, delimiter);
  return parts.join(".");
};

export function addUnit(number: number) {
  const units = ["", "만", "억", "조", "경"];
  let result = "";
  let unitIndex = 0;

  while (number > 0) {
    let remainder = number % 10000;
    if (remainder > 0) {
      let unit = units[unitIndex];
      let remainderString = remainder.toString();
      result = remainderString + unit + " " + result;
    }
    number = Math.floor(number / 10000);
    unitIndex++;
  }

  return result.trim();
}
