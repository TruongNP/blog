import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import ProductItem from '../../ProductItem';
import Pagination from '../../Pagination';

function MainPage() {

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
            <h1 className="h3 mb-2 text-gray-800">Products</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav className="nav">
                    <a className="nav-a active mr-3" href="#">Export</a>
                    <a className="nav-a mr-3" href="#">Import</a>
                    <a className="nav-a  mr-3" href="#">More Action</a>
                </nav>
                <a href="/admin/products/add" className="btn btn-primary bg-primary">Add New</a>
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
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Inventory</th>
                            <th scope="col">Type</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Action</th>
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