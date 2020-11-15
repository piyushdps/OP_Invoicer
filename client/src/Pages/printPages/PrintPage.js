import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import LOGO from '../../devAssets/Logo.jpg';

import {
  PrintMain,
  TopRightPane,
  Footer,
  MiddleTable,
  TopLeftPane,
  TopMain,
} from './PrintPage.styles';
const PrintPage = ({ Items, CustDetails }) => {
  useEffect(() => {
    document.title = 'Invoice'; // add invoice number here
  }, []);

  const [Details, setDetails] = useState({
    companyName: 'KindaFun',
    companyAddress: ' Amar Ghalib Road , Lucknow , Uttar Pradesh,India,Earth',
    companyLogo: '',
    invoiceNo: '1001',
    invoiceDate: '31.10.2020',
    dueDate: '22.10.2021',
  });
  const FootItems = {
    email: 'piyush@gmail.com',
    phone: '8789112509',
    website: 'www.piyusharyan.xyz',
    regNo: '1234567833',
    bank: 'Bank Of America',
    ifsc: 'Barb0kalMuz',
    code: '242hsh166',
    accounNo: '5266617882',
    holder: 'piyush',
  };
  const CustDetails1 = {
    customerName: 'Jindal coorp',
    customerAddress:
      ' Jindal steel coorp, Narayanpur Anant, samstipur, khandala 21',
    customerNotes: 'Customer Notes Goes here',
    unit: 'Kilo',
    dueDate: '22.10.2021',
  };

  //
  const listOfItems = Items.map((o, i) => ({
    ...o,
    tax: parseFloat(o.gst),
    disc: parseFloat(o.discount),
    baseAmount: (parseFloat(o.price) * parseFloat(o.quantity)).toFixed(2),
  }));
  //
  const Rows = listOfItems.map((o, i) => (
    <tr>
      <td>
        <div className='Item-Name'>{o.item}</div>
        <br />
        <div className='Item-Des'>{o.description}</div>
      </td>
      <td>{o.quantity}</td>
      <td>{o.unit} </td>
      <td>{o.price}</td>
      <td>{o.gst ? `${o.gst}%` : '-'}</td>
      <td>{o.discount ? `${o.discount}%` : '-'}</td>

      <td style={{ textAlign: 'right' }}>
        {(
          o.baseAmount -
          (o.baseAmount * o.disc) / 100 +
          (o.baseAmount - (o.baseAmount * o.disc) / 100) * (o.tax / 100)
        ).toFixed(2)}
      </td>
    </tr>
  ));

  //
  let sum = 0;
  listOfItems.forEach((o) => {
    if (o.gst) {
      sum =
        sum +
        (o.baseAmount -
          (o.baseAmount * o.disc) / 100 +
          (o.baseAmount - (o.baseAmount * o.disc) / 100) * (o.tax / 100));
    } else {
      sum = sum + (o.baseAmount - (o.baseAmount * o.disc) / 100);
    }
  });
  //
  return (
    <div style={{ width: '100vw' }}>
      <PrintMain>
        <Container>
          <TopMain>
            <TopLeftPane>
              <div className='company'>
                <span className='companyName'> {Details.companyName}</span>
                <br />{' '}
                <span className='companyAddress'>
                  {' '}
                  {Details.companyAddress}
                </span>
              </div>

              <div className='customer'>
                <span className='customerName'>
                  {' '}
                  Customer : <br /> {CustDetails.customerName}
                </span>
                <br />
                <span className='customerAddress'>
                  {' '}
                  {CustDetails.customerAddress}
                </span>
              </div>

              <div className='CustNotes'>
                <span>{CustDetails.customerNotes}</span>
              </div>
            </TopLeftPane>

            <TopRightPane>
              <div className='LogoContainer'>
                {' '}
                <img className='logo' height='150px' src={LOGO} alt='LogoOF' />
              </div>
              <h3>Invoice</h3>
              <hr />
              <div className='Invo-Container'>
                <div className='row'>
                  <div className='InvoHead'>Invoice No.</div>
                  <div className='InvoDetails'>{Details.invoiceNo}</div>
                </div>
                <div className='row'>
                  <div className='InvoHead'>Invoice Date</div>
                  <div className='InvoDetails'>
                    {CustDetails.invoiceDate}
                  </div>{' '}
                </div>
                <div className='row'>
                  <div className='InvoHead'>
                    {' '}
                    <b>Due Date</b>
                  </div>
                  <div className='InvoDetails'>{CustDetails.dueDate}</div>
                </div>
              </div>
            </TopRightPane>
          </TopMain>
          <MiddleTable>
            <Container style={{ marginTop: 20 }}>
              <table style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th
                      width='40%'
                      style={{ textAlign: 'left', padding: '0px 10px' }}
                    >
                      Description
                    </th>
                    <th width='9%'>Quantity</th>
                    <th width='9%'>Unit</th>
                    <th width='9%'>Price</th>
                    <th width='9%'>GST</th>
                    <th width='14%'>Discount</th>
                    <th width='20%'>Amount</th>
                  </tr>{' '}
                </thead>{' '}
                <tbody>{Rows}</tbody>
              </table>
              <div style={{ float: 'right' }}>
                Total Sum{' '}
                <span style={{ marginLeft: '10px' }}> {sum.toFixed(2)}</span>
              </div>
            </Container>
          </MiddleTable>
        </Container>
        <Footer>
          <div stye={{ display: 'flex' }}>
            <span>
              <b>Email: </b>
              {FootItems.email}
            </span>
            <span>
              <b>Email: </b>
              {FootItems.phone}
            </span>
            <span>
              <b>Website: </b>
              {FootItems.website}
            </span>
            <span>
              <b>Registration Number: </b>
              {FootItems.regNo.toUpperCase()}
            </span>
            <span>
              <b>Account Holder: </b>
              {FootItems.holder.toUpperCase()}
            </span>
            <span>
              <b>IFSC: </b>
              {FootItems.ifsc.toUpperCase()}
            </span>
            <span>
              <b>MICR: </b>
              {FootItems.code.toUpperCase()}
            </span>
            <span>
              <b>Account Number: </b>
              {FootItems.accounNo}
            </span>
          </div>
        </Footer>
      </PrintMain>
    </div>
  );
};

export default PrintPage;
