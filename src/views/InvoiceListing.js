import React from 'react';
import { useHistory } from 'react-router-dom';
import InvoiceCard from '../shared/InvoiceCard';
import { invoices } from '../shared/invoices';
import AddIcon from '../assets/images/icons/plus-white.png';

const InvoiceListing = () => {
  const history = useHistory();
  const goToInvoice = invoiceId => {
    history.push(`/${invoiceId}`);
  };
  const addNewInvoice = () => {
    console.log('Add new');
  };
  return (
    <section>
      <div className="invoice__list--title">
        <h2>Invoices</h2>
        <button className="invoice__list--add">
          <img src={AddIcon} alt="Add new invoice" />
          <span>Add New</span>
        </button>
      </div>
      <div className="invoice__list">
        {invoices.map((el, index) => (
          <InvoiceCard
            {...el}
            key={index}
            onClick={() => goToInvoice(index + 1)}
          />
        ))}
      </div>
    </section>
  );
};

export default InvoiceListing;
