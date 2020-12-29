import React from 'react';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function DiscountItem(props) {
    const {t, i18n} = useTranslation('common');
    const { currentDiscountList, firstItem, lastItem, prefixAdmin, deleteDiscount } = props;
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    return (
        currentDiscountList.slice(firstItem, lastItem).map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        <div className="form-check pl-0">
                        <input type="checkbox" className="form-check-input filled-in" id={`check-${item.id}`} />
                        <label className="form-check-label small text-uppercase card-a-secondary" htmlFor={`check-${item.id}`}></label>
                        </div>
                    </th> 
                    <td>
                        <Link to={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.title}</Link><br></br>
                        <small className="font-weight-lighter text-dark mr-3"><Moment calendar={calendarStrings}>{item.created_at}</Moment></small>
                    </td>
                    <td><span className={`${item.status == 'open' ? 'bg-primary' : 'bg-danger'} pl-2 pr-2 rounded-15 text-light`}>{item.status}</span></td>
                    <td>
                        <button id={`discount-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteDiscount(item.id)}} >{t('general.delete')}</button>
                        <Link to={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >{t('general.edit')}</Link>
                    </td>
                </tr>
            )
        })
    )
} 

export default DiscountItem;