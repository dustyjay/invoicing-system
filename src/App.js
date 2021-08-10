import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import InvoiceListing from './views/InvoiceListing';
import SingleInvoice from './views/SingleInvoice';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/:id" exact>
            <SingleInvoice />
          </Route>
          <Route path="/" exact>
            <InvoiceListing />
          </Route>
          <Route path="**">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
