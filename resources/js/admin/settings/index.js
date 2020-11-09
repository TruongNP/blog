import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// import ModalUpload from '../../components/admin/modalUpload';
const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class Settings extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/settings/media">
                            <h3>Media</h3>
                        </Route>
                    </Switch>
                </Router>
            </AlertProvider>
        );
    }
}

export default Settings;

if (document.getElementById('media')) {
    ReactDOM.render(<Settings />, document.getElementById('media'));
}
