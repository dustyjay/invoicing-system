import React from 'react';
import { formatCurrency, formatDate, formatInvoiceNumber } from '../helpers';

const InvoicePreview = ({ invoice, index }) => {
  const getTaxRate = () => {
    const { tax = 0 } = invoice;
    return (tax / 100) * getSumSubTotal();
  };

  const getDiscount = () => {
    const { discount = 0 } = invoice;
    return (discount / 100) * getSumSubTotal();
  };
  const getSumSubTotal = () => {
    const { items } = invoice;
    return items.reduce((acc, { amount, quantity }) => {
      return acc + amount * quantity;
    }, 0);
  };

  const getSumTotal = () => {
    return getSumSubTotal() - getTaxRate() - getDiscount();
  };

  const footerContent = () => {
    const { userData } = invoice;
    const { email, phone, website } = userData;
    const values = [email, phone, website].filter(el => el);
    return values.join(' | ');
  };

  return (
    <section className="preview">
      <div className="preview-box">
        <div className="preview-top">
          <div>
            <div className="preview-data">
              <div className="preview-data__client">
                <p className="preview__name">{invoice.clientName || '--'}</p>
                <p>
                  Date Issued: <strong>{formatDate(invoice.dateIssued)}</strong>
                </p>
                <p>
                  Invoice Number: <strong>#{formatInvoiceNumber(index)}</strong>
                </p>
              </div>
              <div className="preview-data--self">
                <p>{invoice.userData.name || '--'}</p>
                <p>{invoice.userData.address}</p>
                <p>
                  {invoice.userData.town && `${invoice.userData.town}, `}
                  {invoice.userData.city}
                </p>
                <p>{invoice.userData.postalCode}</p>
              </div>
            </div>
            <div>
              <div className="table">
                <div className="table-head">
                  <div className="table-desc">Product Name</div>
                  <div className="table-price">Price</div>
                  <div className="table-qty">Qty</div>
                  <div className="table-subtotal">Subtotal</div>
                </div>
                <hr className="table-head__hr" />
                <div className="table-body">
                  {invoice.items.map(({ name, amount, quantity }, index) => (
                    <div className="table-row" key={index}>
                      <div className="table-desc">{name}</div>
                      <div className="table-price">
                        {formatCurrency(amount)}
                      </div>
                      <div className="table-qty">{quantity}</div>
                      <div className="table-subtotal">
                        {formatCurrency(amount * quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-bottom">
          <div className="preview-meta__box">
            <div className="preview-meta">
              <div>
                <p className="preview-meta__title">Discount:</p>
                <p className="preview-meta__value">{invoice.discount || 0}%</p>
              </div>
              <div className="preview-meta__total">
                {formatCurrency(getDiscount())}
              </div>
            </div>
            <div className="preview-meta">
              <div>
                <p className="preview-meta__title">Tax rate:</p>
                <p className="preview-meta__value">{invoice.tax || 0}%</p>
              </div>
              <div className="preview-meta__total">
                {formatCurrency(getTaxRate())}
              </div>
            </div>
          </div>
          <div>
            <div className="table">
              <div className="table-head">
                <div className="table-bank">Bank Info</div>
                <div className="table-due">Due By</div>
                <div className="table-total">Total Due</div>
              </div>
              <hr className="table-head__hr" />
              <div className="table-body">
                <div className="table-row">
                  <div className="table-bank">
                    <p>
                      Account No:&nbsp;
                      <strong>{invoice.userData.accountNumber || '--'}</strong>
                    </p>
                    <p>
                      Sort Code:&nbsp;
                      <strong>{invoice.userData.sortCode || '--'}</strong>
                    </p>
                  </div>
                  <div className="table-due">
                    {formatDate(invoice.dueDate) || '--'}
                  </div>
                  <div className="table-total">
                    {formatCurrency(getSumTotal())}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="preview-footer">
            <p className="preview-footer__thanks">❤️ Thank you!</p>
            <p>{footerContent()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoicePreview;
