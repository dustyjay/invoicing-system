import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InvoiceListing from '../../views/InvoiceListing';
import { CONSTANTS, setStorageItem } from '../../helpers';
import { INVOICES } from '../testData';

describe('Invoice Listing', () => {
  let wrapper;
  let container;

  beforeEach(() => {
    wrapper = render(<InvoiceListing />);
    container = wrapper.container;
  });

  afterEach(() => {
    wrapper.unmount();
    cleanup();
  });

  test('Invoice matches snapshot', () => {
    const tree = wrapper.container;
    expect(tree).toMatchSnapshot();
  });

  test('has button to view user data', () => {
    const button = container.querySelector('button.user');
    const userImage = button.querySelector('img[alt="view user data"]');
    expect(button).toBeTruthy();
    expect(userImage).toBeTruthy();
  });

  test('renders empty state if there are no invoices', () => {
    const emptyContainer = container.querySelector('.invoice-item__empty');
    const invoiceList = container.querySelector('.invoice__list');
    expect(emptyContainer).toBeTruthy();
    expect(invoiceList).toBeFalsy();
  });

  test('renders number of available invoices in storage', async () => {
    setStorageItem(CONSTANTS.INVOICES, INVOICES);
    const { container } = render(<InvoiceListing />);
    const emptyContainer = container.querySelector('.invoice-item__empty');
    const invoiceList = container.querySelectorAll('.invoice-card');
    expect(invoiceList.length).toEqual(INVOICES.length);
    expect(emptyContainer).toBeFalsy();
  });
});
