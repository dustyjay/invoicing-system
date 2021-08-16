import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InvoiceForm from '../../views/InvoiceForm';
import { INVOICES } from '../testData';

const customRender = (ui, options) =>
  render(ui, {
    wrapper: props => <InvoiceForm {...props} {...options.wrapperProps} />,
    ...options
  });

const INVOICE_INDEX = 0;

describe('Invoice Form', () => {
  let wrapper;
  let container;

  beforeEach(() => {
    wrapper = customRender(InvoiceForm, {
      wrapperProps: {
        invoice: INVOICES[INVOICE_INDEX],
        index: INVOICE_INDEX,
        onEdit: false
      }
    });
    container = wrapper.container;
  });

  afterEach(() => {
    cleanup();
  });

  test('Invoice Form matches snapshot', () => {
    const tree = wrapper.container;
    expect(tree).toMatchSnapshot();
  });

  test('has the right invoice values', () => {
    const invoice = INVOICES[INVOICE_INDEX];
    const clientNameInput = container.querySelector('#clientname');
    expect(clientNameInput).toHaveValue(invoice.clientName);
  });
});
