import React from 'react';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';
import Empty from '../Empty';

function ProductItem(props) {
    const {t, i18n} = useTranslation('common');
    const { currentProductList, firstItem, lastItem, prefixAdmin, categoryProduct, deleteProduct } = props;

    if(currentProductList.length == 0) {
        return <Empty colSpan="8" message="Product not found"/>;
    }
    return (
        currentProductList.slice(firstItem, lastItem).map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        <div className="form-check pl-0">
                        <input type="checkbox" className="form-check-input filled-in" id={`check-${item.id}`} />
                        <label className="form-check-label small text-uppercase card-a-secondary" htmlFor={`check-${item.id}`}></label>
                        </div>
                    </th> 
                    <td><Link to={`${prefixAdmin}/edit/${item.id}`}><img src={item.feature_image} width="50" alt={item.title} /></Link></td>
                    <td><Link to={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.title}</Link></td>
                    <td>{categoryProduct(item.tags)}</td>
                    <td className="text-primary">{item.status}</td>
                    <td>{item.product_type}</td>
                    <td>{item.vendor}</td>
                    <td>
                        <button id={`product-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteProduct(item.id)}} >{t('general.delete')}</button>
                        <Link to={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >{t('general.edit')}</Link>
                    </td>
                </tr>
            )
        })
    )
} 

export default ProductItem;