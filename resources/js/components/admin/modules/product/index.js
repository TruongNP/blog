import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import ProductItem from '../../ProductItem';
import Pagination from '../../Pagination';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';

function MainPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const prefixAdmin = '/admin/products';

    const [productList, setProductList] = useState([]);
    const totalItem = productList.length;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;

    const onClickPagination = (currentPage) => {
        
        setCurrentPage(currentPage);
    };

    const categoryProduct = (tags) => {
        if(tags != null) {
             const tag = tags.split(',').filter(t => t.startsWith('category:'));
            var catName = tag[0].replace('category:', '');

            return catName;
        }
       
    };

    const deleteProduct = (id) => {
        const product = document.getElementById('product-'+id+'');
        var value = product.innerText;
        product.innerText = value + '...';
        axios.get(`/api/v1/product/delete/${id}`).then(res => {
            alert.success('Product deleted');
            getProductList();
            product.innerText = value;
        }).catch(err => {
            product.innerText = value;
        })
    };

    function getProductList() {
        axios.get('/api/v1/products').then(res => {
            setProductList(res.data.products);
        })
    };

    useEffect(() => {
        getProductList();
    },[]);

    return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">{t('module.products.page_main_lable')}</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav className="nav">
                    <a className="nav-a active mr-3" href="#">{t('general.export')}</a>
                    <a className="nav-a mr-3" href="#">{t('general.import')}</a>
                    <a className="nav-a  mr-3" href="#">{t('general.more_action')}</a>
                </nav>
                <Link to="/admin/products/add" className="btn btn-primary bg-primary">{t('general.add_new')}</Link>
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
                            <th scope="col">{t('general.image')}</th>
                            <th scope="col">{t('module.products.title')}</th>
                            <th scope="col">{t('module.products.category')}</th>
                            <th scope="col">{t('module.products.inventory')}</th>
                            <th scope="col">{t('module.products.type')}</th>
                            <th scope="col">{t('module.products.vendor')}</th>
                            <th scope="col">{t('general.more_action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    <ProductItem prefixAdmin={prefixAdmin} currentProductList={ productList } firstItem={ firstItem } lastItem={ lastItem } categoryProduct={categoryProduct} deleteProduct={deleteProduct} />
                    </tbody>
                </table>
                <Pagination totalItem={ totalItem } itemsPerPage={ itemsPerPage } paginate={ onClickPagination } currentPage={ currentPage } />
            </div>
        </div>
    )
}

export default MainPage;