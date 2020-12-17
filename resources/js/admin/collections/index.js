import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/collections';
import EditPage from '../../components/admin/modules/collections/EditPage';
import AddPage from '../../components/admin/modules/collections/AddPage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class Collections extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/collections">
                            <MainPage />
                        </Route>
                        <Route exact path="/admin/collections/add">
                            <AddPage />
                        </Route>
                        <Route exact path="/admin/collections/edit/:id">
                            <EditPage />
                        </Route>
                    </Switch>
                </Router>
            </AlertProvider>
        );
    }
}

export default Collections;

if (document.getElementById('collections')) {
    ReactDOM.render(<Collections />, document.getElementById('collections'));
}
