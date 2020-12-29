import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import Moment from 'react-moment';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';

function OrderItem(props) {
    const {t, i18n} = useTranslation('common');
    const [currencyCode, setCurrencyCode] = useState('');

    const getGeneralSetting = () => {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            setCurrencyCode(generalSetting[0].currency_code);
        })
    }

    const { currentOrderList, firstItem, lastItem, prefixAdmin } = props;

    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    useEffect(() => {
        getGeneralSetting();
    },[]);
    return (
        currentOrderList.slice(firstItem, lastItem).map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        <div className="form-check pl-0">
                        <input type="checkbox" className="form-check-input filled-in" id={`check-${item.id}`} />
                        <label className="form-check-label small text-uppercase card-a-secondary" htmlFor={`check-${item.id}`}></label>
                        </div>
                    </th> 
                    <td><Link to={`${prefixAdmin}/edit/${item.id}`} className="text-primary font-weight-bold">#{item.id}</Link></td>
                    <td>
                        <Moment calendar={calendarStrings}>{item.created_at}</Moment>
                    </td>
                    <td><span className="text-primary">{item.first_name}&nbsp;{item.last_name}</span></td>
                    <td>
                        {currencyCode == '$' ? currencyCode : ''}&nbsp;
                        <NumberFormat thousandSeparator={true} displayType={'text'} value={item.total}/>
                        &nbsp;{currencyCode != '$' ? currencyCode : ''}
                    </td>
                    <td><span className={`${item.payment_status == 'Paid' ? 'bg-primary text-light' : 'bg-warning text-dark'} pl-2 pr-2 rounded-15`}>{item.payment_status}</span></td>
                    <td><span className={`${item.fulfillment_status == 'Fulfilled' ? 'bg-primary text-light' : 'bg-warning text-dark'} pl-2 pr-2 rounded-15`}>{item.fulfillment_status}</span></td>
                    <td>{JSON.parse(item.order_items).orders.length} items</td>
                    <td>{item.payment_method}</td>
                    <td><span className={`${item.status == 'Open' ? 'bg-primary' : 'bg-danger'} pl-2 pr-2 rounded-15 text-light`}>{item.status}</span></td>
                    <td>
                        <Link to={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary border-0 btn-sm m-0 py-1 px-2 text-light" >{t('general.edit')}</Link>
                    </td>
                </tr>
            )
        })
    )
} 

export default OrderItem;