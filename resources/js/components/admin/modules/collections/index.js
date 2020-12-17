import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import CollectionItem from '../../CollectionItem';
import Pagination from '../../Pagination';

function MainPage() {

    const alert = useAlert();

    const prefixAdmin = '/admin/collections';

    const [collectionList, setCollectionList] = useState([]);
    const totalItem = collectionList.length;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;

    const onClickPagination = (currentPage) => {
        
        setCurrentPage(currentPage);
    };

    const deleteCollection = (id) => {
        const collection = document.getElementById('collection-'+id+'');
        var value = collection.innerText;
        collection.innerText = value + '...';
        axios.get(`/api/v1/collection/delete/${id}`).then(res => {
            alert.success('collection deleted');
            getCollectionList();
            collection.innerText = value;
        }).catch(err => {
            collection.innerText = value;
        })
    };

    function getCollectionList() {
        axios.get('/api/v1/collections').then(res => {
            setCollectionList(res.data);
        })
    };

    useEffect(() => {
        getCollectionList();
    },[]);

    return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">collections</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav className="nav">
                    <a className="nav-a active mr-3" href="#">Export</a>
                    <a className="nav-a mr-3" href="#">Import</a>
                    <a className="nav-a  mr-3" href="#">More Action</a>
                </nav>
                <a href="/admin/collections/add" className="btn btn-primary bg-primary">Add New</a>
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
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <CollectionItem prefixAdmin={prefixAdmin} currentCollectionList={ collectionList } firstItem={ firstItem } lastItem={ lastItem } deleteCollection={deleteCollection} />
                    </tbody>
                </table>
                <Pagination totalItem={ totalItem } itemsPerPage={ itemsPerPage } paginate={ onClickPagination } currentPage={ currentPage } />
            </div>
        </div>
    )
}

export default MainPage;