import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import OrderItem from '../../OrderItem';
import Pagination from '../../Pagination';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';

function MainPage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const prefixAdmin = '/admin/orders';

    const [orderList, setOrderList] = useState([]);
    const totalItem = orderList.length;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;

    const onClickPagination = (currentPage) => {
        
        setCurrentPage(currentPage);
    };

    function getOrderList() {
        axios.get('/api/v1/orders').then(res => {
            setOrderList(res.data);
        })
    };

    useEffect(() => {
        getOrderList();
    },[]);

    return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">{t('module.orders.page_main_lable')}</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav className="nav">
                    <a className="nav-a active mr-3" href="#">{t('general.export')}</a>
                    <a className="nav-a mr-3" href="#">{t('general.import')}</a>
                    <a className="nav-a  mr-3" href="#">{t('general.more_action')}</a>
                </nav>
                <Link to={`${prefixAdmin}/add`} className="btn btn-primary bg-primary">{t('general.add_new')}</Link>
            </div>
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check pl-0">
                                <input type="checkbox" className="form-check-input filled-in" id="check-all"  />
                                <label className="form-check-label small text-uppercase card-a-secondary"  htmlFor="check-all"></label>
                                </div>
                            </th>
                            <th scope="col">{t('module.orders.title')}</th>
                            <th scope="col">{t('module.orders.date')}</th>
                            <th scope="col">{t('module.orders.customer')}</th>
                            <th scope="col">{t('module.orders.total')}</th>
                            <th scope="col">{t('module.orders.payment_status')}</th>
                            <th scope="col">{t('module.orders.fulfillment')}</th>
                            <th scope="col">{t('module.orders.items')}</th>
                            <th scope="col">{t('module.orders.payment_method')}</th>
                            <th scope="col">{t('module.orders.status')}</th>
                            <th scope="col">{t('general.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    <OrderItem prefixAdmin={prefixAdmin} currentOrderList={ orderList } firstItem={ firstItem } lastItem={ lastItem } />
                    </tbody>
                </table>
                <Pagination totalItem={ totalItem } itemsPerPage={ itemsPerPage } paginate={ onClickPagination } currentPage={ currentPage } />
            </div>
        </div>
    )
}

export default MainPage;