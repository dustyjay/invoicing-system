import React from 'react';
import MoreIcon from '../assets/images/icons/more.svg';
import { formatDate } from '../helpers';

const InvoiceCard = ({
  clientName,
  dateIssued,
  dueDate,
  items = [],
  onView,
  onEdit,
  onDelete,
  onPrint
}) => {
  return (
    <div className="invoice-card">
      <h3 className="invoice-card__title" onClick={onView}>
        {clientName || '--'}
      </h3>
      <div className="invoice-card__body">
        <div className="invoice-card__text">
          <p>
            Product Items:&nbsp;
            {items.length === 0 ? (
              <span>None</span>
            ) : (
              <span>{items.length}</span>
            )}
          </p>
          <p>Date Issued: {formatDate(dateIssued)}</p>
          <p>Date Due: {formatDate(dueDate) || '--'}</p>
        </div>
        <div className="dropleft">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src={MoreIcon} alt="show options" />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" onClick={onPrint}>
              Print
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={onEdit}>
              Edit
            </button>
            <button className="dropdown-item" onClick={onView}>
              View
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item delete" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
