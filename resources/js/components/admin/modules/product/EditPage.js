import React, { useState } from 'react';
import { Products } from '../../../../data/admin/products';
import { Link, useParams } from "react-router-dom";

function EditPage() {

    let { id } = useParams();
    
    const [titleProduct, setTitleProduct] = useState(id);

    return (
        <main className="main">
            <div className="container-fluid pt-5 pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">Products</h1>
                <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link active" onClick={() => window.history.back()}>Go Back ></a>
                    </nav>
                    <a href="/admin/product/add" className="btn btn-primary bg-primary">Add New</a>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="md-form form-lg">
                                <input type="text" id="inputLGEx" className="form-control form-control-lg text-primary" value={ titleProduct } placeholder="Title" />
                            </div>
                        </form>
                    </div>
                    <div className="col-3">
                        <h3>Right Sidebar</h3>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EditPage;