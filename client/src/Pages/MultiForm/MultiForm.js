import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../app/Sidebar';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '18ch',
  },
  small: {
    width: '10ch',
  },
}));

function MultiForm({ setState, CustDetails, setCustDetails }) {
  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      item: '',
      description: '',
      quantity: '',
      price: '',
      unit: '',
      gst: 0,
      discount: 0,
    },
  ]);

  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    setState([...inputFields]);
  }, [inputFields.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('InputFields', inputFields);
    history.push('/print');
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        item: '',
        description: '',
        quantity: '',
        price: '',
        unit: '',
        gst: 0,
        discount: 0,
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    let arr = [];
    [...inputFields].forEach((o) => {
      arr.push(o.id);
    });

    values.splice(arr.indexOf(id), 1);
    setInputFields(values);
  };

  //
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date, String) => {
    setCustDetails({ ...CustDetails, dueDate: String });
  };
  //

  return (
    <div
      className='justify-content'
      style={{ display: 'flex', width: '100vw' }}
    >
      <Sidebar />

      <div style={{ width: '80vw' }}>
        {/*  */}

        <form className={classes.root} onSubmit={handleSubmit}>
          {/* Add New Input features Here */}
          <br />
          <Card style={{ padding: 14, margin: '30px ' }}>
            <div>
              <h5>Customer Details</h5>
              <TextField
                label='Customer Name '
                id='outlined-margin-none'
                className={classes.textField}
                value={CustDetails.customerName}
                onChange={(e) =>
                  setCustDetails({
                    ...CustDetails,
                    customerName: e.target.value,
                  })
                }
              />

              <TextField
                label='Note For Customer'
                id='outlined-margin-none'
                className={classes.textField}
                value={CustDetails.customerNotes}
                onChange={(e) =>
                  setCustDetails({
                    ...CustDetails,
                    customerNotes: e.target.value,
                  })
                }
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  label='Date picker dialog'
                  format='dd.MM.yyyy'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextField
                id='outlined-full-width'
                label=' Customer Address'
                style={{ margin: 8 }}
                placeholder='Address'
                className={classes.textField}
                value={CustDetails.customerAddress}
                onChange={(e) =>
                  setCustDetails({
                    ...CustDetails,
                    customerAddress: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Card>
          {/*  */}
          {/*  */}
          {/*  */}
          <Card style={{ padding: 14, margin: '30px ' }}>
            <h5>Item details</h5>
            <div
              style={{
                display: ' flex',
                flexDirection: 'row-reverse',
                padding: '0px 5%',
              }}
            >
              <Button
                disabled={
                  [...inputFields].length === 10 ? 'disabled' : undefined
                }
                onClick={handleAddFields}
                size='sm'
              >
                <AddIcon /> Add Items
              </Button>
            </div>

            <div>
              {inputFields.map((inputField, i) => (
                <div key={inputField.id}>
                  <h6>{`Item ${i + 1}`}</h6>
                  <TextField
                    name='item'
                    label='Item Name'
                    className={classes.textField}
                    required
                    value={inputField.item}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <TextField
                    name='description'
                    label='Item Description'
                    style={{ width: '30ch' }}
                    value={inputField.description}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <TextField
                    name='quantity'
                    label='Quantity'
                    type='number'
                    className={classes.small}
                    required
                    value={inputField.quantity}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />{' '}
                  <TextField
                    name='unit'
                    label='Unit'
                    className={classes.small}
                    required
                    value={inputField.unit}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />{' '}
                  <TextField
                    name='price'
                    label='Rate'
                    className={classes.small}
                    type='number'
                    required
                    value={inputField.price}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />{' '}
                  <TextField
                    name='gst'
                    type='number'
                    label='GST %'
                    className={classes.small}
                    value={
                      inputField.gst === '0' || inputField.gst === 0
                        ? ''
                        : inputField.gst
                    }
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <TextField
                    type='number'
                    className={classes.small}
                    name='discount'
                    label='Discount %'
                    value={
                      inputField.discount === '0' || inputField.discount === 0
                        ? ''
                        : inputField.discount
                    }
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <IconButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <hr />
                </div>
              ))}

              <Button
                className={classes.button}
                variant='secondary'
                size='sm'
                type='submit'
              >
                Create Invoice
              </Button>
            </div>
          </Card>
        </form>

        {/*  */}

        {/*  */}
        {/*  */}
      </div>
    </div>
  );
}

export default MultiForm;
