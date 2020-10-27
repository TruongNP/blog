import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/product';
import EditPage from '../../components/admin/modules/product/EditPage';

class Product extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/admin/product/all">
                        <MainPage />
                    </Route>
                    <Route path="/admin/product/add">
                        <MainPage />
                    </Route>
                    <Route path="/admin/product/edit/:id">
                        <EditPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Product;

if (document.getElementById('product')) {
    ReactDOM.render(<Product />, document.getElementById('product'));
}
