import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CloseBtnIcon from '../assets/images/icons/close-btn.png';
import FormInput from './Input';

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
    maxWidth: '600px',
    margin: '0 auto',
    position: 'unset',
    height: 'fit-content',
    maxHeight: '85vh',
    boxShadow: '0px 10px 10px rgba(33, 33, 33, 0.2)',
    padding: '2rem',
    paddingTop: 0
  }
};

const AddNewItem = ({ show, closeModal, item }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (item) {
      setFormValues(item);
      setIsEdit(true);
    } else {
      setFormValues();
      setIsEdit(false);
    }
  }, [item, show]);

  const handleSubmit = e => {
    e.preventDefault();
    closeModal({ name, amount, quantity });
  };

  const setFormValues = (values = {}) => {
    const { name = '', amount, quantity = 1 } = values;
    setName(name);
    setAmount(amount);
    setQuantity(quantity);
  };

  const isFormValid = () => {
    return name && amount && quantity;
  };
  return (
    <Modal
      isOpen={show}
      onRequestClose={() => closeModal()}
      style={customStyles}
      contentLabel="Add New Product"
    >
      <div className="invoice__title modal-title">
        <h4>{isEdit ? 'Edit' : 'Add'} Product Item</h4>
        <button
          className="fab fab--close show-mobile"
          onClick={() => closeModal()}
        >
          <img src={CloseBtnIcon} alt="close modal" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          value={name}
          placeholder="Enter product description"
          type="text"
          name="productdescription"
          label="Description"
          onInput={setName}
        />
        <div className="form-group">
          <FormInput
            value={amount}
            placeholder="Enter amount ($)"
            type="number"
            name="productamount"
            label="Amount ($)"
            onInput={setAmount}
          />
          <FormInput
            value={quantity}
            placeholder="Enter quantity"
            type="number"
            name="productqty"
            label="Quantity"
            onInput={setQuantity}
          />
        </div>
        <div className="form-group form-buttons">
          <button
            className="fab fab--edit show-mobile"
            type="button"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            className="fab fab--add show-mobile"
            type="submit"
            disabled={!isFormValid()}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewItem;
