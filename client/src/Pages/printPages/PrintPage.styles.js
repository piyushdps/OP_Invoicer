import styled from 'styled-components';

export const PrintMain = styled.div`
  background: white;
  width: 380mm;
  height: 297mm;

  @media print {
    @page {
      margin-top: 0;
      margin-bottom: 0;
    }
    body {
      padding-top: 72px;
      padding-bottom: 72px;
    }
  }
`;
export const TopMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media print {
    margin: 400px auto 0 auto;
  }
`;
export const TopLeftPane = styled.div`
  flex: 1 0 55%;
  padding: 10px 40px;
  display: flex;

  justify-content: center;
  //   align-items: center;
  flex-direction: column;
  .company .companyName {
    font-size: 13px;

    text-align: left;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.4);
  }
  .company .companyAddress {
    font-size: 15px;
    text-align: left;
  }
  .customerAddress,
  .customerName {
    font-size: 15px;
    flex: 1 0 100%;
  }
  .customerName {
    font-weight: 500;
  }
  .customer {
    margin-top: 20px;
  }
  .CustNotes {
    font-size: 15px;
    margin-top: 30px;
  }
  @media print {
    .company .companyName {
      font-size: 17px;

      text-align: left;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.4);
    }
    .company .companyAddress {
      font-size: 19px;
      text-align: left;
    }
    .customerAddress,
    .customerName {
      font-size: 19px;
      flex: 1 0 100%;
    }
    .customerName {
      font-weight: 500;
    }
    .customer {
      margin-top: 20px;
    }
    .CustNotes {
      font-size: 19px;
      margin-top: 30px;
    }
  }
`;
export const TopRightPane = styled.div`
  flex: 1 0 45%;
  padding: 20px 20px;
  .LogoContainer {
    height: 150px;
    background: white;
    color: white;
  }
  .logo {
    float: right;
  }
  .Invo-Container {
    width: 100%;
    padding: 2px 28px;

    font-size: 16px;
  }

  .Invo-Container .h3 {
    text-align: left;
  }
  .InvoHead {
    text-align: center;
  }
  .InvoDetails {
    margin-left: 10px;
    text-align: center;
    float: right;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  @media print {
    .Invo-Container {
      width: 100%;
      padding: 2px 28px;

      font-size: 20px;
    }
  }
`;
export const MiddleTable = styled.div`
  table {
    width: 100%;
  }
  .Item-Name {
    font-weight: 500;
    font-size: 18px;
    padding: 0px 10px;
    text-align: left;
  }
  .Item-Des {
    font-size: 15px;
    padding: 0px 10px;
    text-align: left;
  }
  tr {
    border-bottom: 1px solid grey;
  }
  @media print {
    .Item-Name {
      font-size: 22px;
    }
    .Item-Des {
      font-size: 19px;
    }
  }
`;
export const Footer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);

  margin-top: 120px;
  text-align: center;
  width: 100%;
  span {
    padding: 0px 5px;
  }
  @media print {
    position: fixed;
    padding: 10px 10px 0px 10px;
    bottom: 0;
    color: white;
    width: 100%;
    /* Height of the footer*/

    background: grey;
  }
`;
