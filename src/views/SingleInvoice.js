import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import html2pdf from 'html-to-pdf-js';
import {
  CONSTANTS,
  formatInvoiceNumber,
  getStorageItem,
  removeStorageItem,
  setStorageItem
} from '../helpers';
import InvoicePreview from './InvoicePreview';
import SearchIcon from '../assets/images/icons/search-icon.png';
import EditIcon from '../assets/images/icons/edit.png';
import AddIcon from '../assets/images/icons/plus-white.png';
import DeleteIcon from '../assets/images/icons/close-btn.png';
import PrinterIcon from '../assets/images/icons/printer-blue.png';
import BackIcon from '../assets/images/icons/left-arrow.svg';
import InvoiceForm from './InvoiceForm';
import AddNewItem from '../shared/AddNewItem';

const getInvoice = () => {
  const link = window.location.href.split('/');
  const index = +link[link.length - 1];
  const invoices = getStorageItem(CONSTANTS.INVOICES);
  const { length } = invoices;
  if (isNaN(index) || index > length) return { index: -1 };
  return { index, invoice: invoices[index - 1] };
};

const SingleInvoice = () => {
  const history = useHistory();
  const [showPreview, setShowPreview] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [invoiceIndex, setInvoiceIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  useEffect(() => {
    const { index, invoice } = getInvoice();
    if (index === -1) {
      history.goBack();
      return;
    }
    setShowPreview(getStorageItem(CONSTANTS.SHOW_PREVIEW));
    setInvoice(invoice);
    setInvoiceIndex(index);

    // Print invoice if set from invoice listing page
    if (getStorageItem(CONSTANTS.PRINT_ON_ENTER)) {
      printInvoice(invoice);
      removeStorageItem(CONSTANTS.PRINT_ON_ENTER);
    }

    removeStorageItem(CONSTANTS.SHOW_PREVIEW);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const allInvoices = getStorageItem(CONSTANTS.INVOICES);
    allInvoices[invoiceIndex - 1] = invoice;
    setStorageItem(CONSTANTS.INVOICES, allInvoices);
  }, [invoice, invoiceIndex]);

  const handleOnEdit = newValue => {
    setInvoice(newValue);
  };

  const closeModal = item => {
    setShowModal(false);
    if (item) {
      const items = [...getInvoiceItems()];
      if (activeItemIndex || activeItemIndex === 0) {
        items[activeItemIndex] = item;
      } else {
        items.push(item);
      }
      setInvoice({ ...invoice, items });
    }
    setActiveItemIndex(null);
  };

  const getInvoiceItems = () => {
    return invoice.items || [];
  };

  const handleEditItem = index => {
    setActiveItemIndex(index);
    setShowModal(true);
  };

  const handleDeleteItem = index => {
    const items = getInvoiceItems();
    items.splice(index, 1);
    setInvoice({ ...invoice, items });
  };

  const printInvoice = ({ clientName }) => {
    setShowPreview(true);

    setTimeout(() => {
      const element = document.querySelector('.preview');
      const filename = clientName || 'invoice';
      const opt = {
        filename,
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }, 500);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="invoice">
      <div className="invoice__title">
        <div className="invoice__list--back">
          <button
            className="fab fab--back show-mobile"
            onClick={() => handleGoBack()}
          >
            <img src={BackIcon} alt="Go back" />
          </button>
          <h1>
            Invoice&nbsp;
            {showPreview ? 'Preview' : `#${formatInvoiceNumber(invoiceIndex)}`}
          </h1>
        </div>
        <div className="fab-box">
          {showPreview ? (
            <button
              className="fab fab--edit"
              onClick={() => setShowPreview(false)}
            >
              <img src={EditIcon} alt="Add new invoice" />
              <span>Edit</span>
            </button>
          ) : (
            <React.Fragment>
              <button
                className="fab fab--edit"
                onClick={() => setShowPreview(true)}
              >
                <img src={SearchIcon} alt="Preview invoice" />
                <span>Preview</span>
              </button>
            </React.Fragment>
          )}
          <button
            className="fab fab--edit"
            onClick={() => printInvoice(invoice)}
          >
            <img src={PrinterIcon} alt="Preview invoice" />
            <span>Print</span>
          </button>
        </div>
      </div>
      {showPreview ? (
        <InvoicePreview invoice={invoice} index={invoiceIndex} />
      ) : (
        <React.Fragment>
          <InvoiceForm
            invoice={invoice}
            onEdit={handleOnEdit}
            index={invoiceIndex}
          />
          <section>
            {getInvoiceItems().length === 0 ? (
              <div className="invoice-item__empty">
                <i>
                  <img src={SearchIcon} alt="Empty product items" />
                </i>
                <p>This invoice has no product items</p>
                <button
                  className="fab fab--add show-mobile"
                  onClick={() => setShowModal(true)}
                >
                  <span>Add Item</span>
                </button>
              </div>
            ) : (
              <React.Fragment>
                <div className="table-form__box">
                  <div className="table table-form">
                    <div className="table-head">
                      <div className="table-desc">Product Name</div>
                      <div className="table-price">Price</div>
                      <div className="table-qty">Qty</div>
                      <div className="table-subtotal">Subtotal</div>
                      <div className="table-actions">Actions</div>
                    </div>
                    <hr className="table-head__hr" />
                    <div className="table-body">
                      {getInvoiceItems().map(
                        ({ name, amount, quantity }, index) => (
                          <div className="table-row" key={index}>
                            <div className="table-desc">{name}</div>
                            <div className="table-price">${amount}</div>
                            <div className="table-qty">{quantity}</div>
                            <div className="table-subtotal">
                              ${amount * quantity}
                            </div>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="fab fab--edit fab--icon fab--small show-mobile"
                                onClick={() => handleEditItem(index)}
                              >
                                <img src={EditIcon} alt="Edit product item" />
                              </button>
                              <button
                                type="button"
                                className="fab fab--delete fab--icon fab--small show-mobile"
                                onClick={() => handleDeleteItem(index)}
                              >
                                <img
                                  src={DeleteIcon}
                                  alt="Delete product item"
                                />
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="invoice__add">
                  <button
                    className="fab fab--add fab--small show-mobile"
                    onClick={() => setShowModal(true)}
                  >
                    <img src={AddIcon} alt="Add Invoice Item" />
                    <span>Add New</span>
                  </button>
                </div>
              </React.Fragment>
            )}
          </section>
        </React.Fragment>
      )}

      <AddNewItem
        show={showModal}
        closeModal={closeModal}
        item={getInvoiceItems()[activeItemIndex]}
      />
    </div>
  );
};

export default SingleInvoice;
