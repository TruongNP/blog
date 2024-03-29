import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import MainPage from '../../components/admin/modules/settings';
import GeneralPage from '../../components/admin/modules/settings/GeneralPage';
import ProfilePage from '../../components/admin/modules/settings/ProfilePage';
import MediaPage from '../../components/admin/modules/settings/MediaPage';
import SwatchesPage from '../../components/admin/modules/settings/SwatchesPage';
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
class Settings extends Component {
    render() {
        return (
            <I18nextProvider i18n={i18next}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <Router>
                        <Switch>
                            <Route exact path="/admin/settings">
                                <MainPage />
                            </Route>
                            <Route exact path="/admin/settings/general">
                                <GeneralPage />
                            </Route>
                            <Route exact path="/admin/settings/profile">
                                <ProfilePage />
                            </Route>
                            <Route exact path="/admin/settings/media">
                                <MediaPage />
                            </Route>
                            <Route exact path="/admin/settings/swatches">
                                <SwatchesPage />
                            </Route>
                        </Switch>
                    </Router>
                </AlertProvider>
            </I18nextProvider>
        );
    }
}

export default Settings;

if (document.getElementById('settings')) {
    ReactDOM.render(<Settings />, document.getElementById('settings'));
}
