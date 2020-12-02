import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/orders';
import EditPage from '../../components/admin/modules/product/EditPage';
import AddPage from '../../components/admin/modules/orders/AddPage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class Orders extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/orders">
                            <MainPage />
                        </Route>
                        <Route exact path="/admin/orders/add">
                            <AddPage />
                        </Route>
                        <Route exact path="/admin/orders/edit/:id">
                            {/* <EditPage /> */}
                        </Route>
                    </Switch>
                </Router>
            </AlertProvider>
        );
    }
}

export default Orders;

if (document.getElementById('orders')) {
    ReactDOM.render(<Orders />, document.getElementById('orders'));
}
