import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import OrderItem from '../../OrderItem';
import Pagination from '../../Pagination';

function MainPage() {

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
            <h1 className="h3 mb-2 text-gray-800">Orders</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav className="nav">
                    <a className="nav-a active mr-3" href="#">Export</a>
                    <a className="nav-a mr-3" href="#">Import</a>
                    <a className="nav-a  mr-3" href="#">More Action</a>
                </nav>
                <a href={`${prefixAdmin}/add`} className="btn btn-primary bg-primary">Create Order</a>
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
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Total</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col">Fulfillment</th>
                            <th scope="col">Items</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
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