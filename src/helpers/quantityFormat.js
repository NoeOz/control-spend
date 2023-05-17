export function formatMK(num) {
  if (isNaN(num)) {
    return "--.--";
  }
  //? absolute value
  let absNum = Math.abs(num);
  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T';
  } else if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  } else if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  } else if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toString();
}

export function formatComa(num) {
  if (num === undefined || num === null) return "";

  const quantity = num.toString();
  let result = "";

  let count = 0;
  for (let i = quantity.length - 1; i >= 0; i--) {
    result = quantity[i] + result;
    count++;

    if (count % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }

  return result;
}
