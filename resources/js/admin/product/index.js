import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/product';
import EditPage from '../../components/admin/modules/product/EditPage';
import AddPage from '../../components/admin/modules/product/AddPage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// import ModalUpload from '../../components/admin/modalUpload';
const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class Product extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/products">
                            <MainPage />
                        </Route>
                        <Route path="/admin/products/add">
                            <AddPage />
                        </Route>
                        <Route path="/admin/products/edit/:id">
                            <EditPage />
                        </Route>
                    </Switch>
                </Router>
            </AlertProvider>
        );
    }
}

export default Product;

if (document.getElementById('product')) {
    ReactDOM.render(<Product />, document.getElementById('product'));
}
