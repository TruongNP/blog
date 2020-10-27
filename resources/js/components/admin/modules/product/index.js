import React from 'react';
import { Products } from '../../../../data/admin/products';
import { Link } from "react-router-dom";

function MainPage() {

    const prefixAdmin = '/admin/product';
    
    const productList = Products.filter(p => p.available == true);
    console.log('productList:', productList);

    const categoryProduct = (tags) => {
        const tag = tags.filter(t => t.startsWith('category:'));
        var catName = tag[0].replace('category:', '');

        return catName;
    };

    const deleteProduct = (id) => {
        console.log('id:', id);
    };

    const updateProduct = (id) => {
        console.log('id:', id);
    }

    return (
        <div class="container-fluid pl-5 pb-5 pr-5">
            <h1 class="h3 mb-2 text-gray-800">Products</h1>
            <div class="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav class="nav">
                    <a class="nav-a active mr-3" href="#">Export</a>
                    <a class="nav-a mr-3" href="#">Import</a>
                    <a class="nav-a  mr-3" href="#">More Action</a>
                </nav>
                <a href="/admin/product/add" class="btn btn-primary bg-primary">Add New</a>
            </div>
            <div class="table-responsive text-nowrap">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div class="form-check pl-0">
                                <input type="checkbox" class="form-check-input filled-in" id="check-all"  />
                                <label class="form-check-label small text-uppercase card-a-secondary"  htmlFor="check-all"></label>
                                </div>
                            </th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Available</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Category</th>
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
                                    <label className="form-check-label small text-uppercase card-link-secondary" htmlFor="check-1"></label>
                                    </div>
                                </th> 
                                <td><Link to={`${prefixAdmin}/edit/${item.id}`}><img src={item.feature_image} width="50" alt={item.title} /></Link></td>
                                <td><Link to={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.title}</Link></td>
                                <td>{item.price}</td>
                                <td className="text-primary">{item.available == true ? 'Instock' : 'Outstock'}</td>
                                <td>{item.inventory_quantity}</td>
                                <td>{categoryProduct(item.tags)}</td>
                                <td>
                                    <Link className="btn btn-dark-green bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteProduct(item.id)}} >Delete</Link>
                                    <Link to={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >Edit</Link>
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