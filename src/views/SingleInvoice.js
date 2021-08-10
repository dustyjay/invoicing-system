import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { invoices } from '../shared/invoices';

const getInvoice = () => {
  const link = window.location.href.split('/');
  const index = link[link.length - 1];
  const { length } = invoices;
  if (isNaN(index) || +index > length) return -1;
  return invoices[index - 1];
};

const SingleInvoice = () => {
  const history = useHistory();
  const [invoice, setInvoice] = useState({});
  useEffect(() => {
    const inv = getInvoice();
    if (inv === -1) {
      history.goBack();
      return;
    }
    setInvoice(inv);
  }, []);
  return (
    <div className="invoice">
      <section>
        <h4>Preview</h4>
        <div className="preview-box">
          <div className="preview-top">
            <div className="preview-data">
              <div className="preview-data__client">
                <p className="preview__name">Client Name</p>
                <p>
                  Date Issued: <strong>04 May, 2021</strong>
                </p>
                <p>
                  Invoice Number: <strong>#2394</strong>
                </p>
              </div>
              <div className="preview-data--self">
                <p>Your Name</p>
                <p>Address</p>
                <p>Town, City</p>
                <p>Postcode</p>
              </div>
            </div>
            <div className="table-box">
              <div className="table">
                <div className="table-head">
                  <div className="table-desc">Product Name</div>
                  <div className="table-price">Price</div>
                  <div className="table-qty">Qty</div>
                  <div className="table-subtotal">Subtotal</div>
                </div>
                <hr className="table-head__hr" />
                <div className="table-body">
                  <div className="table-row">
                    <div className="table-desc">
                      Frontend web swidfvjhnpaerhvg caeru g bnaeriu hgciuwertb
                      cgheauirghquicghr reqg fyer
                    </div>
                    <div className="table-price">$3000</div>
                    <div className="table-qty">2</div>
                    <div className="table-subtotal">$6000</div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-desc">
                    hv9iuaehrgiuaehgiorubhaeti hgioae hvriosrhetioghqoi nrfi jr
                    giohreiog hioeqhrg kljhurtigh wo vhoierh ogqhioe
                  </div>
                  <div className="table-price">$10000</div>
                  <div className="table-qty">4</div>
                  <div className="table-subtotal">$40000</div>
                </div>
              </div>
            </div>
          </div>
          <div className="preview-bottom">
            <div className="table-box">
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
                        Account No: <strong>0256541816</strong>
                      </p>
                      <p>
                        Sort Code: <strong>01457</strong>
                      </p>
                    </div>
                    <div className="table-due">18th May '21</div>
                    <div className="table-total">$6000</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="preview-footer">
              <p className="preview-footer__thanks">❤️ Thank you!</p>
              <p>name@email.com | +44 452 656 633 | website.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleInvoice;
