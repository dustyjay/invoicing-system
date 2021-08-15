export const CONSTANTS = {
  INVOICES: 'invoices',
  SHOW_PREVIEW: 'show-preview',
  USER_DATA: 'user-data',
  INVOICE_NUMBER_LENGTH: 5
};

export const formatInvoiceNumber = number => {
  const num = Math.ceil(number);
  const { length } = `${num}`;
  let zeroDigits = CONSTANTS.INVOICE_NUMBER_LENGTH - length;
  let finalNumber = '';
  while (zeroDigits > 0) {
    finalNumber += '0';
    zeroDigits -= 1;
  }
  return finalNumber + num;
};

export const formatDate = date => {
  if (date) return new Date(date).toDateString();
  return '';
};

export const formatCurrency = value => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(value);
};

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorageItem = key => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
};

export const removeStorageItem = key => {
  localStorage.removeItem(key);
};
