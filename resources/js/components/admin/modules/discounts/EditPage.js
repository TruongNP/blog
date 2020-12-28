import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import { useAlert } from "react-alert";
import Loader from '../../loader';
import {useTranslation} from "react-i18next";
import { Status } from '../../../../data/admin/collections';
import NumberFormat from 'react-number-format';

function AddPage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    var pathName = window.location.pathname;
    let idArr = pathName.split('/');
    const id = idArr[idArr.length - 1]

    const [title, setTitle] = useState('');
    const [productTag, setProductTag] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [status, setStatus] = useState('open');
    const [discountValue, setDiscountValue] = useState('');
    const [submiting, setSubmiting] = useState(false);
    const [errors, setErrors] = useState([]);
    const [currencyCode, setCurrencyCode] = useState('');
    const [currency, setCurrency] = useState('');

    function getGeneralSetting() {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            setCurrencyCode(generalSetting[0].currency_code);
            setCurrency(generalSetting[0].currency);
        })
    }

    function getDiscount() {
        axios.get(`/api/v1/discount/${id}`).then(res => {
            const discount = res.data;

            setTitle(discount.title);
            setProductTag(discount.product_tags);
            setProductPrice(discount.product_price);
            setDiscountValue(discount.discount_value);
            setStatus(discount.status);
        });
    }

    useEffect(() => {
        getGeneralSetting();
        getDiscount();
    },[]);
    
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    };

    const onChangProductTag = (e) => {
        setProductTag(e.target.value);
    };

    const onChangProductPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    };

    const onChangeDiscountValue = (e) => {
        setDiscountValue(e.target.value)
    };
    
    
    const submitForm = () => {
        var data = new FormData();
        data.append('id', id);
        data.append('title', title);
        data.append('product_tags', productTag);
        data.append('product_price', productPrice);
        data.append('status', status);
        data.append('discount_value', discountValue);

        setSubmiting(true)

        axios.post('/api/v1/discounts/edit', data, {
            
        }).then(res => {
            setSubmiting(false)
            if(res.data.error) {
                alert.error(res.data.error);
                setErrors(res.data.error_detail);
            }
            else if(res.data.success) {
                alert.success(res.data.success);
                setErrors([]);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        }).catch((err)=>{
            setSubmiting(false);
            alert.error("There was an error sending");
        })
    };

    //scroll to top on add page
    const onScrollTop = () => {
        var scrollItem = document.getElementById("scroll-top");

        var sticky = scrollItem.offsetTop;

        if (window.pageYOffset > sticky) {
            scrollItem.classList.add("sticky")
        } else {
            scrollItem.classList.remove("sticky");
        }
    }


    window.onscroll = function() {onScrollTop()};

    return (
        <main className="main">
            <div className="container pt-5 pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">{t('module.discounts.page_edit_label')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="txt-title">{t('module.discounts.title')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="txt-title"
                                    onChange={(e) => {onChangeTitle(e)}}
                                    value={title}
                                />
                                <div className="invalid-feedback">{errors.title ? errors.title : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-product-price">{t('module.discounts.product_price')}</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-uppercase">{currency == 'VND' ? currency : currencyCode}</span>
                                    </div>
                                    <NumberFormat onChange={(e) => {onChangProductPrice(e)}} className={`form-control ${errors.product_price ? 'is-invalid' : ''}`} thousandSeparator={true} value={productPrice} />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-uppercase">{currency == 'VND' ? currencyCode : currency}</span>
                                    </div>
                                </div>
                                <div className="invalid-feedback">{errors.product_price ? errors.product_price : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-product-tag">{t('module.discounts.product_tag')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.product_tags ? 'is-invalid' : ''}`}
                                    id="txt-product-tag"
                                    onChange={(e) => {onChangProductTag(e)}}
                                    value={productTag}
                                />
                                <div className="invalid-feedback">{errors.product_tags ? errors.product_tags : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-discount-value">{t('module.discounts.discount_value')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.discount_value ? 'is-invalid' : ''}`}
                                    id="txt-discount-value"
                                    onChange={(e) => {onChangeDiscountValue(e)}}
                                    value={discountValue}
                                />
                                <div className="invalid-feedback">{errors.discount_value ? errors.discount_value : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="slt-status">{t('module.discounts.status')}</label>
                                <select
                                className={`form-control`}
                                id="slt-status"
                                onChange={(e) => onChangeStatus(e)}
                                value={status}
                                >
                                    {
                                        Status.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value} selected={status == item.value ? true : null}>{item.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </form>
                        <button className="btn btn-primary bg-primary mt-3" onClick={() => {submitForm()}}>{t('general.update')} {submiting == true ? <Loader with="20" /> : null}</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddPage;