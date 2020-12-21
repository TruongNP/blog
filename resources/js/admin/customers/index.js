import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/customers';
import EditPage from '../../components/admin/modules/customers/EditPage';
import AddPage from '../../components/admin/modules/customers/AddPage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class Customers extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/customers">
                            <MainPage />
                        </Route>
                        <Route exact path="/admin/customers/add">
                            <AddPage />
                        </Route>
                        <Route exact path="/admin/customers/edit/:id">
                            <EditPage />
                        </Route>
                    </Switch>
                </Router>
            </AlertProvider>
        );
    }
}

export default Customers;

if (document.getElementById('customers')) {
    ReactDOM.render(<Customers />, document.getElementById('customers'));
}
