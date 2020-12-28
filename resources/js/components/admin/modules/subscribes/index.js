import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import Moment from 'react-moment';

function MainPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [subscribes, setSubscribes] = useState([]);
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    const getSubscribe = () => {
        axios.get(`/api/v1/subscribes`).then(res => {
            setSubscribes(res.data);
        })
    }

    const deleteSubscribe = (id) => {
        const subscribe = document.getElementById('subscribe-'+id+'');
        var value = subscribe.innerText;
        subscribe.innerText = value + '...';
        axios.get(`/api/v1/subscribe/delete/${id}`).then(res => {
            alert.success('Subscribe deleted');
            getSubscribe();
            subscribe.innerText = value;
        }).catch(err => {
            subscribe.innerText = value;
        })
    }

    useEffect(() => {
        getSubscribe();
    },[]);

    return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">{t('module.subscribes.page_main_label')}</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
            </div>
            <div className="table-responsive text-nowrap">
                <div className={`list-group`}>
                        {
                            subscribes.map((item, index) => {
                                return (
                                    <div key={index} className="d-flex align-items-center border-bottom">
                                        <Link to={`/admin/subscribes/view/${item.id}`} key={index} className="list-group-item-action d-flex align-items-center pl-3 pt-2 pr-3 pb-2 text-dark font-weight-lighter" >
                                            <span><strong>{item.name}</strong> - {item.email}</span>
                                        </Link>
                                        <small className="font-weight-lighter text-dark mr-3"><Moment calendar={calendarStrings}>{item.created_at}</Moment></small>
                                        <button id={`subscribe-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteSubscribe(item.id)}} >{t('general.delete')}</button>
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