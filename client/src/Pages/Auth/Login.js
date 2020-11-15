import React, { Component } from 'react';
import { Container, Form, Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BckGrnd from '../../devAssets/LoginBg.jpg';
import firebase from '../../firebase';
import { Button } from 'react-bootstrap';

export default class PhoneLogin extends Component {
  constructor() {
    super();
    this.state = {
      form: true,
      alert: false,
      loading: false,
      pageLoad: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          console.log('Captcha Resolved');
          this.onSignInSubmit();
        },
        defaultCountry: 'IN',
      }
    );
  };
  componentDidMount() {
    const onSend = (e) => {
      return this.setState({
        loading: true,
      });
    };
  }

  onSignInSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      pageLoad: true,
    });

    this.setUpRecaptcha();
    let phoneNumber = '+91' + this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log('OTP is sent');
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      loading: true,
      pageLoad: false,
    });
  };

  onSubmitOtp = async (e) => {
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.

        console.log('NEW USER', result.additionalUserInfo.isNewUser);
        console.log('phone Number ' + result.user.phoneNumber);
        console.log('uid ' + result.user.uid);
        console.log('User Create Date ' + result.user.createdAt);

        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert('Incorrect OTP');
        document.location.reload();
      });
  };

  render() {
    return (
      <div
        className='justify-content-center align-items-center '
        style={{
          width: '100vw',
          height: '100vh',
          background: `url(${BckGrnd})`,
          backgroundSize: 'cover',
          display: 'flex',
        }}
      >
        <Card style={{ width: 700, padding: 20 }}>
          <div>
            <Row xs={12} md={12} lg={12} className='justify-content-center'>
              <h3>Welcome To OpInvoicer</h3>
              <Col xs={10} md={7} lg={7}>
                <h4 className='mb-3'>Phone Number</h4>
                <Form className='form' onSubmit={this.onSignInSubmit}>
                  <div id='recaptcha-container'></div>
                  <Form.Group>
                    <Form.Control
                      type='number'
                      disabled={this.state.loading ? 'disabled' : undefined}
                      name='mobile'
                      placeholder='Mobile Number'
                      onChange={this.onChangeHandler}
                      required
                    />
                  </Form.Group>
                  <Button type='submit' className='w-100'>
                    {this.state.pageLoad ? 'Loading...' : 'Generate Otp'}
                  </Button>
                </Form>
              </Col>
            </Row>
            <br />
            <Row className='justify-content-center'>
              <Col xs={10} md={7} lg={7}>
                <h4 className='mb-3'>Enter OTP</h4>
                <Form className='form' onSubmit={this.onSubmitOtp}>
                  <Form.Group>
                    <Form.Control
                      id='otp'
                      type='number'
                      name='otp'
                      placeholder='OTP'
                      disabled={!this.state.loading ? 'disabled' : undefined}
                      onChange={this.onChangeHandler}
                    />
                  </Form.Group>
                  <Button
                    className='w-100'
                    type='submit'
                    disabled={!this.state.loading ? 'disabled' : undefined}
                  >
                    {' '}
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}
