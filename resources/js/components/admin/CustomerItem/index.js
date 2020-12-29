import React from 'react';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';

function CustomerItem(props) {
    const {t, i18n} = useTranslation('common');
    const { currentCustomerList, firstItem, lastItem, prefixAdmin, deleteCustomer } = props;
    return (
        currentCustomerList.slice(firstItem, lastItem).map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        <div className="form-check pl-0">
                        <input type="checkbox" className="form-check-input filled-in" id={`check-${item.id}`} />
                        <label className="form-check-label small text-uppercase card-a-secondary" htmlFor={`check-${item.id}`}></label>
                        </div>
                    </th> 
                    <td><Link to={`${prefixAdmin}/edit/${item.id}`}><img src={item.avata} width="50" alt={item.title} /></Link></td>
                    <td>
                        <Link to={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.first_name} {item.last_name}</Link>
                        <br></br>
                        <span>{item.address}</span>
                    </td>
                    <td><span className="text-capitalize pl-2 pr-2 rounded-15 text-light bg-primary">{item.role}</span></td>
                    <td>
                        <button id={`customer-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteCustomer(item.id)}} >{t('general.delete')}</button>
                        <Link to={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >{t('general.edit')}</Link>
                    </td>
                </tr>
            )
        })
    )
} 

export default CustomerItem;