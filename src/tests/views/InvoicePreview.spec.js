import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InvoicePreview from '../../views/InvoicePreview';
import { INVOICES } from '../testData';
import { formatDate } from '../../helpers';

const customRender = (ui, options) =>
  render(ui, {
    wrapper: props => <InvoicePreview {...props} {...options.wrapperProps} />,
    ...options
  });

const INVOICE_INDEX = 0;

describe('Invoice Preview', () => {
  let wrapper;
  let container;
  let getByText;

  beforeEach(() => {
    wrapper = customRender(InvoicePreview, {
      wrapperProps: {
        invoice: INVOICES[INVOICE_INDEX],
        index: INVOICE_INDEX
      }
    });
    container = wrapper.container;
    getByText = wrapper.getByText;
  });

  afterEach(() => {
    cleanup();
  });

  test('Invoice Form matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test("has the right client's data", () => {
    const { clientName = '--', dateIssued, dueDate } = INVOICES[INVOICE_INDEX];
    const clientNameText = getByText(clientName);
    const dateIssuedText = getByText(formatDate(dateIssued));
    const dueDateText = getByText(formatDate(dueDate));
    expect(clientNameText).toBeInTheDocument();
    expect(dateIssuedText).toBeInTheDocument();
    expect(dueDateText).toBeInTheDocument();
  });

  test('has the correct number of items in the invoice', () => {
    const { items } = INVOICES[INVOICE_INDEX];
    const tableRows = container.querySelectorAll('.table-row.items');
    expect(tableRows.length).toEqual(items.length);
  });

  test('has the right user data', () => {
    const { userData = {} } = INVOICES[INVOICE_INDEX];
    const {
      name = '--',
      email,
      phone,
      address,
      town,
      city,
      postalCode,
      accountNumber,
      sortCode,
      website
    } = userData;
    const footerContent = [email, phone, website].filter(el => el).join(' | ');
    const nameText = getByText(new RegExp(name, 'i'));
    const footerText = getByText(new RegExp(footerContent, 'i'));
    const addressText = getByText(new RegExp(address, 'i'));
    const townText = getByText(new RegExp(town));
    const cityText = getByText(new RegExp(city));
    const postalCodeText = getByText(new RegExp(postalCode));
    const accountNumberText = getByText(new RegExp(accountNumber));
    const sortCodeText = getByText(new RegExp(sortCode));
    expect(nameText).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
    expect(addressText).toBeInTheDocument();
    expect(townText).toBeInTheDocument();
    expect(cityText).toBeInTheDocument();
    expect(postalCodeText).toBeInTheDocument();
    expect(accountNumberText).toBeInTheDocument();
    expect(sortCodeText).toBeInTheDocument();
  });
});
