import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CloseBtnIcon from '../assets/images/icons/close-btn.png';
import FormInput from './Input';
import { CONSTANTS, getStorageItem, setStorageItem } from './invoices';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(33,33,33,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10001
  },
  content: {
    width: '85%',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'unset',
    height: 'fit-content',
    maxHeight: '85vh',
    boxShadow: '0px 10px 10px rgba(33, 33, 33, 0.2)',
    padding: '2rem',
    paddingTop: 0
  }
};

const FORM_FIELDS = {
  name: {
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Name'
  },
  email: {
    type: 'email',
    placeholder: 'Enter your email address',
    label: 'Email'
  },
  phone: {
    type: 'tel',
    placeholder: 'Enter your phone number',
    label: 'Phone'
  },
  address: {
    type: 'text',
    placeholder: 'Enter your address',
    label: 'Address'
  },
  town: {
    type: 'text',
    placeholder: 'Enter your town',
    label: 'Town'
  },
  city: {
    type: 'text',
    placeholder: 'Enter your city',
    label: 'City'
  },
  postalCode: {
    type: 'number',
    placeholder: 'Enter your postal code',
    label: 'Postal Code'
  },
  accountNumber: {
    type: 'number',
    placeholder: 'Enter your account number',
    label: 'Account Number'
  },
  sortCode: {
    type: 'number',
    placeholder: 'Enter your sort code',
    label: 'Sort Code'
  },
  website: {
    type: 'url',
    placeholder: 'Enter your website',
    label: 'Website'
  }
};

const AddPersonalData = ({ show, closeModal }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const existingData = getStorageItem(CONSTANTS.USER_DATA);
    setUserData(existingData || {});
  }, [show]);

  const handleSubmit = e => {
    e.preventDefault();
    setStorageItem(CONSTANTS.USER_DATA, userData);
    closeModal();
  };

  const setFormValues = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => closeModal()}
      style={customStyles}
      contentLabel="Add Personal data"
    >
      <div className="invoice__title modal-title">
        <h4>Your Personal Details</h4>
        <button
          className="fab fab--close show-mobile"
          onClick={() => closeModal()}
        >
          <img src={CloseBtnIcon} alt="close modal" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <p>
          Set your personal information here to save time while creating a new
          invoice
        </p>
        <div className="form-group user">
          {Object.entries(FORM_FIELDS).map(
            ([name, { placeholder, type, label }]) => (
              <FormInput
                key={name}
                value={userData[name]}
                placeholder={placeholder}
                type={type}
                name={name}
                label={label}
                onInput={e => setFormValues(name, e)}
              />
            )
          )}
        </div>
        <div className="form-group form-buttons">
          <button
            className="fab fab--edit show-mobile"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="fab fab--add show-mobile" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPersonalData;
