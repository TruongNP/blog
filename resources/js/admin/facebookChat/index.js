import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/facebookChat';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class FacebookChat extends Component {
    render() {
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/facebook-chat">
                            <MainPage />
                        </Route>
                    </Switch>
                </Router>
            </AlertProvider>
        );
    }
}

export default FacebookChat;

if (document.getElementById('facebook')) {
    ReactDOM.render(<FacebookChat />, document.getElementById('facebook'));
}
