export const invoices = [
  {
    clientName: 'Jurassic Park',
    dateIssued: '24 May, 2031',
    dueDate: '14 June, 2031',
    discount: 0,
    tax: 0,
    items: [
      {
        name: 'Frontend Development',
        amount: 3000,
        quantity: 2
      },
      {
        name: 'Backend Development',
        amount: 10000,
        quantity: 4
      }
    ]
  },
  {
    clientName: 'Jurassic Park',
    dateIssued: '24 May, 2031',
    dueDate: '14 June, 2031',
    discount: 5,
    tax: 2.5,
    items: []
  },
  {
    clientName: 'Jurassic Park',
    dateIssued: '24 May, 2031',
    dueDate: '14 June, 2031',
    discount: 1,
    tax: 4.1,
    items: [
      {
        name: 'Frontend Development',
        amount: 3000,
        quantity: 2
      },
      {
        name: 'Backend Development',
        amount: 10000,
        quantity: 4
      }
    ]
  },
  {
    clientName: 'Jurassic Park',
    dateIssued: '24 May, 2031',
    dueDate: '14 June, 2031',
    discount: 1.5,
    tax: 2.5,
    items: [
      {
        name: 'Frontend Development',
        amount: 3000,
        quantity: 2
      },
      {
        name: 'Backend Development',
        amount: 10000,
        quantity: 4
      }
    ]
  },
  {
    clientName: 'Jurassic Park',
    dateIssued: '24 May, 2031',
    dueDate: '14 June, 2031',
    discount: 1,
    tax: 2,
    items: [
      {
        name: 'Frontend Development',
        amount: 3000,
        quantity: 2
      },
      {
        name: 'Backend Development',
        amount: 10000,
        quantity: 4
      }
    ]
  },
  {
    clientName: 'Jurassic Park',
    dateIssued: '24 May, 2031',
    dueDate: '14 June, 2031',
    discount: 2,
    tax: 0,
    items: [
      {
        name: 'Frontend Development',
        amount: 3000,
        quantity: 2
      },
      {
        name: 'Backend Development',
        amount: 10000,
        quantity: 4
      }
    ]
  }
];

export const userInfo = {
  name: 'Jane Doe',
  email: 'jane@doe.me',
  phone: '+44959270823',
  address: '4, Harold road',
  town: 'Mowe',
  city: 'Lagos',
  postalCode: '100010',
  accountNumber: '3918789023',
  sortCode: '10482',
  website: 'jane-doe.com'
};

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
