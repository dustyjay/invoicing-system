import React from 'react';
import EnterIcon from '../assets/images/icons/enter-icon.png';

const InvoiceCard = ({ clientName, dateIssued, invoices = [], onClick }) => {
  return (
    <div className="invoice-card" onClick={onClick}>
      <h3 className="invoice-card__title">{clientName}</h3>
      <div className="invoice-card__body">
        <div className="invoice-card__text">
          <p>
            Product Items:&nbsp;
            {invoices.length === 0 ? (
              <span>None</span>
            ) : (
              <span>{invoices.length}</span>
            )}
          </p>
          <p>Date Issued: {dateIssued}</p>
        </div>
        <i className="invoice-card__enter">
          <img src={EnterIcon} alt="Enter" />
        </i>
      </div>
    </div>
  );
};

export default InvoiceCard;
