import './App.css';
import { Fragment } from 'react';
import PrintPage from './Pages/printPages/PrintPage';
import MultiForm from './Pages/MultiForm/MultiForm';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Auth/Login';

function App() {
  const [state, setstate] = useState([]);
  const [CustDetails, setCustDetails] = useState({
    invoiceDate: new Date()
      .toLocaleString('en-IN')
      .split(',')[0]
      .replaceAll('/', '.'),
  });
  return (
    <div className='App'>
      <Router>
        <Fragment>
          <Switch>
            <Route
              exact
              path={'/'}
              render={(props) => (
                <MultiForm
                  {...props}
                  setCustDetails={setCustDetails}
                  CustDetails={CustDetails}
                  setState={setstate}
                />
              )}
            />

            <Route
              exact
              path={'/print'}
              render={(props) => (
                <PrintPage {...props} Items={state} CustDetails={CustDetails} />
              )}
            />
            <Route
              exact
              path={'/login'}
              render={(props) => (
                <Login
                  {...props}
                  setCustDetails={setCustDetails}
                  CustDetails={CustDetails}
                  setState={setstate}
                />
              )}
            />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}
export default App;
