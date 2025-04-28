export const getFormattedMonth = (month: number): string =>
  (month + 1).toString().padStart(2, "0");

export const getFormattedDate = (year: number, month: number): string =>
  `${year}-${getFormattedMonth(month)}-01`;
