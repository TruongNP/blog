import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/orders';
import EditPage from '../../components/admin/modules/orders/EditPage';
import AddPage from '../../components/admin/modules/orders/AddPage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import common_en from '../../../../public/language/en.json';
import common_vi from '../../../../public/language/vi.json';

const lang = document.documentElement.lang;
i18next.init({
    interpolation: { escapeValue: false },
    lng: lang,
    resources: {
        en: {
            common: common_en
        },
        vi: {
            common: common_vi
        }
    },
});
const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }
class Orders extends Component {
    render() {
        return (
            <I18nextProvider i18n={i18next}>
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
                                <EditPage />
                            </Route>
                        </Switch>
                    </Router>
                </AlertProvider>
            </I18nextProvider>
        );
    }
}

export default Orders;

if (document.getElementById('orders')) {
    ReactDOM.render(<Orders />, document.getElementById('orders'));
}
