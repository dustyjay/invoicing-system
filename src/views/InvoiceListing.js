import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InvoiceCard from '../shared/InvoiceCard';
import { CONSTANTS, getStorageItem, setStorageItem } from '../shared/invoices';
import AddIcon from '../assets/images/icons/plus-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import UserIcon from '../assets/images/icons/user.svg';
import AddPersonalData from '../shared/AddPersonalData';

const InvoiceListing = () => {
  const [invoices, setInvoices] = useState([]);
  const [showUserData, setShowUserData] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const allInvoices = getStorageItem(CONSTANTS.INVOICES) || [];
    setInvoices(allInvoices);
  }, []);

  const goToInvoice = invoiceId => {
    history.push(`/${invoiceId}`);
  };

  const handleOnDelete = index => {
    const allInvoices = [...invoices];
    allInvoices.splice(index, 1);
    setInvoices(allInvoices);
    setStorageItem(CONSTANTS.INVOICES, invoices);
  };

  const handleOnView = index => {
    setStorageItem(CONSTANTS.SHOW_PREVIEW, true);
    goToInvoice(index);
  };

  const addNewInvoice = () => {
    setStorageItem(CONSTANTS.INVOICES, [...invoices, getDefaultInvoice()]);
    goToInvoice(invoices.length + 1);
  };

  const getDefaultInvoice = () => {
    const dateIssued = new Date().toISOString().split('T')[0];
    return {
      clientName: '',
      dateIssued,
      dueDate: '',
      discount: '',
      tax: '',
      items: [],
      userData: getStorageItem(CONSTANTS.USER_DATA) || {}
    };
  };

  return (
    <section>
      <AddPersonalData
        show={showUserData}
        closeModal={() => setShowUserData(false)}
      />
      <div className="invoice__title">
        <h1>📝 Invoices</h1>
        <div className="d-flex">
          <button
            className="fab fab--back user show-mobile"
            onClick={() => setShowUserData(true)}
          >
            <img src={UserIcon} alt="view your data" />
          </button>
          {invoices.length > 0 && (
            <div className="fab-box">
              <button className="fab fab--add" onClick={addNewInvoice}>
                <img src={AddIcon} alt="Add new invoice" />
                <span className="show-mobile">Add New</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {invoices.length ? (
        <div className="invoice__list">
          {invoices.map((el, index) => (
            <InvoiceCard
              {...el}
              key={index}
              onEdit={() => goToInvoice(index + 1)}
              onView={() => handleOnView(index + 1)}
              onDelete={() => handleOnDelete(index)}
            />
          ))}
        </div>
      ) : (
        <div className="invoice-item__empty">
          <i>
            <img src={SearchIcon} alt="Empty invoice list" />
          </i>
          <p>No invoices yet!</p>
          <button className="fab fab--add" onClick={addNewInvoice}>
            <span>Add New Invoice</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default InvoiceListing;
