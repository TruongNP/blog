import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {

    const prefixAdmin = '/admin/products';

    const [productList, setProductList] = useState([]);

    const categoryProduct = (tags) => {
        const tag = tags.filter(t => t.startsWith('category:'));
        var catName = tag[0].replace('category:', '');

        return catName;
    };

    const deleteProduct = (id) => {
        console.log('id:', id);
    };

    function getProductList() {
        axios.get('/api/v1/products').then(res => {
            setProductList(res.data)
        })
    }

    useEffect(() => {
        getProductList();
    })

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
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        productList.map((item, index) => {
                            return (
                            <tr key={index}>
                                <th scope="row">
                                    <div className="form-check pl-0">
                                    <input type="checkbox" className="form-check-input filled-in" id="check-1" />
                                    <label className="form-check-label small text-uppercase card-a-secondary" htmlFor="check-1"></label>
                                    </div>
                                </th> 
                                <td><a href={`${prefixAdmin}/edit/${item.id}`}><img src={item.feature_image} width="50" alt={item.title} /></a></td>
                                <td><a href={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.title}</a></td>
                                <td>
                                    <button className="btn btn-dark-green bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteProduct(item.id)}} >Delete</button>
                                    <a href={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >Edit</a>
                                </td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MainPage;