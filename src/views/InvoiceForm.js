import React, { useEffect, useState } from 'react';
import FormInput from '../shared/Input';
import { formatInvoiceNumber, userInfo } from '../shared/invoices';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const InvoiceForm = ({ invoice, index, onEdit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(invoice);
  }, [invoice]);

  const setFormValues = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = () => {
    onEdit(formData);
  };

  const setUserValues = (name, value) => {
    const newUserData = { ...formData.userData, [name]: value };
    setFormValues('userData', newUserData);
  };

  return (
    <React.Fragment>
      <form className="invoice-form">
        <Tabs>
          <TabList>
            <Tab>Client Details</Tab>
            <Tab>Personal Details</Tab>
            <Tab>Account Details</Tab>
            <Tab>Other</Tab>
          </TabList>

          <TabPanel>
            <div className="form-section__content">
              <FormInput
                value={formData.clientName}
                placeholder="Enter client name here"
                name="clientname"
                label="Client Name"
                onInput={e => setFormValues('clientName', e)}
                onBlur={saveChanges}
              />
              <FormInput
                value={formData.dateIssued}
                placeholder="Date issued"
                type="date"
                name="dateissued"
                label="Date Issued"
                readOnly
              />
              <FormInput
                value={formatInvoiceNumber(index)}
                placeholder="Enter invoice number"
                name="invoicenumber"
                label="Invoice No. #"
                readOnly
              />
            </div>
          </TabPanel>
          <TabPanel>
            {formData.userData && (
              <div className="form-section__content">
                <FormInput
                  value={formData.userData.name}
                  placeholder="Enter your name here"
                  name="yourname"
                  label="Your Name"
                  onInput={e => setUserValues('name', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.email}
                  placeholder="Enter your email here"
                  name="youremail"
                  label="Email Address"
                  onInput={e => setUserValues('email', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.phone}
                  placeholder="Enter your phone number here"
                  type="tel"
                  name="yourphone"
                  label="Phone Number"
                  onInput={e => setUserValues('phone', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.website}
                  placeholder="Enter your website here"
                  type="url"
                  name="yourwebsite"
                  label="Website"
                  onInput={e => setUserValues('website', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.address}
                  placeholder="Enter your home address here"
                  name="youraddress"
                  label="Home Address"
                  onInput={e => setUserValues('address', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.town}
                  placeholder="Enter your town here"
                  name="yourtown"
                  label="Town"
                  onInput={e => setUserValues('town', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.city}
                  placeholder="Enter your city here"
                  name="yourcity"
                  label="City"
                  onInput={e => setUserValues('city', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.postalCode}
                  placeholder="Enter your postalCode here"
                  type="number"
                  name="yourpostalcode"
                  label="Postal Code"
                  onInput={e => setUserValues('postalCode', e)}
                  onBlur={saveChanges}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {formData.userData && (
              <div className="form-section__content">
                <FormInput
                  value={formData.userData.accountNumber}
                  placeholder="Enter your account number here"
                  type="number"
                  name="accountnumber"
                  label="Account Number"
                  onInput={e => setUserValues('accountNumber', e)}
                  onBlur={saveChanges}
                />
                <FormInput
                  value={formData.userData.sortCode}
                  placeholder="Enter your bank sort code here"
                  type="number"
                  name="sortcode"
                  label="Sort code"
                  onInput={e => setUserValues('sortCode', e)}
                  onBlur={saveChanges}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel>
            <div className="form-section__content">
              <FormInput
                value={formData.discount}
                placeholder="Enter discount percentage"
                name="discount"
                label="Discount (%)"
                onInput={e => setFormValues('discount', e)}
                onBlur={saveChanges}
              />
              <FormInput
                value={formData.tax}
                placeholder="Enter tax percentage"
                name="tax"
                label="Tax Rate (%)"
                onInput={e => setFormValues('tax', e)}
                onBlur={saveChanges}
              />
              <FormInput
                value={formData.dueDate}
                placeholder="Select due date"
                type="date"
                name="duedate"
                label="Due date"
                onInput={e => setFormValues('dueDate', e)}
                onBlur={saveChanges}
              />
            </div>
          </TabPanel>
        </Tabs>
      </form>
    </React.Fragment>
  );
};

export default InvoiceForm;
