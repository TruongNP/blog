import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

function MainPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [allMail, setAllMail] = useState([]);

    const getAllMail = () => {
        axios.get(`/api/v1/emails`).then(res => {
            setAllMail(res.data);
        })
    }

    const deleteEmail = (id) => {
        const email = document.getElementById('email-'+id+'');
        var value = email.innerText;
        email.innerText = value + '...';
        axios.get(`/api/v1/email/delete/${id}`).then(res => {
            alert.success('Email deleted');
            getAllMail();
            email.innerText = value;
        }).catch(err => {
            email.innerText = value;
        })
    }

    useEffect(() => {
        getAllMail();
    },[]);

    return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">{t('module.emails.page_main_label')}</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
            <nav className="nav">
                    <a className="nav-a  mr-3" href="#">{t('general.more_action')}</a>
                </nav>
                <Link to="/admin/emails/create" className="btn btn-primary bg-primary">{t('module.emails.create_new_mail')}</Link>
            </div>
            <div className="table-responsive text-nowrap">
                <div className={`list-group`}>
                        {
                            allMail.map((item, index) => {
                                return (
                                    <div className="d-flex align-items-center border-bottom">
                                        <Link to={`/admin/emails/view/${item.id}`} key={index} className="list-group-item-action d-flex align-items-center pl-3 pt-2 pr-3 pb-2 text-dark font-weight-lighter" >
                                            <span><strong>{item.sender}</strong> | {item.receive} - {item.subject}</span>
                                        </Link>
                                        <button id={`email-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteEmail(item.id)}} >{t('general.delete')}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    )
}

export default MainPage;