import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useTranslation} from "react-i18next";
import Moment from 'react-moment';

function View(props) {
    const {t, i18n} = useTranslation('common');

    var pathName = window.location.pathname;
    let idArr = pathName.split('/');
    const id = idArr[idArr.length - 1]

    const [mail, setMail] = useState([]);
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    const getMailById = () => {
        axios.get(`/api/v1/email/${id}`).then(res => {
            setMail(res.data);
        })
    }

    useEffect(() => {
        getMailById();
    },[]);
    return (
        <main className="main">
            <div className="container pt-5 pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">{t('module.emails.page_view_label')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                </div>
                <div className="row mt-4">
                    <div className="col-12 mb-3">
                        <div className="d-flex mb-2 text-dark">
                            <label><strong>{t('module.emails.from')}&nbsp;</strong></label>
                            <span>{mail.sender} {`<${mail.mail_from}>`}</span>
                        </div>
                        <div className="d-flex mb-2 text-dark">
                            <label><strong>{t('module.emails.to')}&nbsp;</strong></label>
                            <span>{mail.receive} {`<${mail.mail_to}>`}</span>
                            <small className="ml-auto float-right font-weight-lighter text-dark"><Moment calendar={calendarStrings}>{mail.created_at}</Moment></small>
                        </div>
                        <hr></hr>
                        <div className="mb-3 text-dark font-weight-lighter" dangerouslySetInnerHTML={{__html: mail.message}}></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default View;