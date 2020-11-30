import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";

function MainPage() {

    const alert = useAlert();

    const prefixAdmin = '/admin/settings';

    useEffect(() => {
    },[]);

    return (
        <main className="main">
            <div className="container pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">Settings</h1>
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <a href={`${prefixAdmin}/general`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-fw fa-cog"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">General</h6>
                                    <span className="text-secondary">View and update your store details</span>
                                </div>  
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <a href={`${prefixAdmin}/profile`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-user"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">Account</h6>
                                    <span className="text-secondary">View and update your account details</span>
                                </div>  
                            </a>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <a href={`${prefixAdmin}/media`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-image"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">Media</h6>
                                    <span className="text-secondary">View and add your media details</span>
                                </div>  
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainPage;