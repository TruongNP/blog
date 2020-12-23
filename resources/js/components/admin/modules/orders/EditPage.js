import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import Loader from '../../loader';
import NumberFormat from 'react-number-format';
import { paymentMethodList, statusOrderList, paymentStatusList, fulfillmentStatusList } from '../../../../data/admin/order';
import Moment from 'react-moment';
import {useTranslation} from "react-i18next";

function EditPage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();
    const prefixAdmin = "/admin/orders";

    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    var pathName = window.location.pathname;
    let idArr = pathName.split('/');
    const id = idArr[idArr.length - 1];

    const [submiting, setSubmiting] = useState(false);
    const [currencyCode, setCurrencyCode] = useState('');

    const [currentOrder, setCurrentOrder] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [createAt, setSCreatedAt] = useState('');
    //product
    const [selectedProdList, setSelectedProdList] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [statusOrder, setStatusOrder] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [fulfillmentStatus, setFulfillmentStatus] = useState('');
    const [phoneDefault, setPhoneDefault] = useState('');
    const [emailDefault, setEmailDefault] = useState('');
    const [addressDefault, setAddressDefault] = useState('');

    
    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeShippingAddress = (e) => {
        setShippingAddress(e.target.value)
    }

    // product 
    const getOrderById = () => {
        axios.get(`/api/v1/order/${id}`).then(res => {
            const order = res.data;

            const productItem = JSON.parse(order.order_items).orders;

            setCurrentOrder(order.id);
            setFirstName(order.first_name);
            setLastName(order.last_name);
            setPhoneNumber(order.phone_number);
            setPhoneDefault(order.phone_number);
            setEmail(order.contact_email);
            setEmailDefault(order.contact_email);
            setShippingAddress(order.shipping_address);
            setAddressDefault(order.shipping_address);
            setCity(order.city);
            setCountry(order.country);
            setTotalPrice(order.total);
            setNotes(order.note);
            setPaymentMethod(order.payment_method);
            setStatusOrder(order.status);
            setPaymentStatus(order.payment_status);
            setFulfillmentStatus(order.fulfillment_status);
            setSelectedProdList(productItem);
            setSCreatedAt(order.created_at);
        })
    }

    const onChangeNotes = (e) => {
        setNotes(e.target.value)
    }

    const onChangePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const onChangeStatusOrder = (e) => {
        setStatusOrder(e.target.value)
    }

    const onChangePaymentStatus = (e) => {
        setPaymentStatus(e.target.value)
    }

    const onChangeFulfillmentStatus = (e) => {
        setFulfillmentStatus(e.target.value)
    }

    const onChangePhoneInfo = (e) => {
        var label = e.target;

        if(label.textContent == t('general.edit')) {
            label.textContent = t('general.cancel');
        }
        else {
            label.textContent = t('general.edit');
                setPhoneNumber(phoneDefault);
        }

        const txt = document.getElementById('txt-phone');
        const input = document.getElementById('input-phone');

        txt.classList.toggle("d-none");
        input.classList.toggle("d-block");
    }

    const onChangeEmailInfo = (e) => {
        var label = e.target;

        if(label.textContent == t('general.edit')) {
            label.textContent = t('general.cancel');
        }
        else {
            label.textContent = t('general.edit');
                setEmail(emailDefault);
        }

        const txt = document.getElementById('txt-email');
        const input = document.getElementById('input-email');

        txt.classList.toggle("d-none");
        input.classList.toggle("d-block");
    }

    const onChangeAddressInfo = (e) => {
        var label = e.target;

        if(label.textContent == t('general.edit')) {
            label.textContent = t('general.cancel');
        }
        else {
            label.textContent = t('general.edit');
            setShippingAddress(addressDefault);
        }

        const txt = document.getElementById('txt-address');
        const input = document.getElementById('input-address');

        txt.classList.toggle("d-none");
        input.classList.toggle("d-block");
    }

    //get setting
    const getGeneralSetting = () => {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            setCurrencyCode(generalSetting[0].currency_code);
        })
    }

    useEffect(() => {
        getGeneralSetting();
        getOrderById();
    },[]);

    const submitForm = () => {

        var data = new FormData();
        data.append('id', id);
        data.append('phone_number', phoneNumber);
        data.append('contact_email', email);
        data.append('shipping_address', shippingAddress);
        data.append('note', notes);
        data.append('payment_method', paymentMethod);
        data.append('status', statusOrder);
        data.append('payment_status', paymentStatus);
        data.append('fulfillment_status', fulfillmentStatus);

        setSubmiting(true)

        axios.post('/api/v1/orders/update', data, {
            
        }).then(res => {
            setSubmiting(false)
            if(res.data.error) {
                alert.error(res.data.error);
                setErrors(res.data.error_detail);
            }
            else if(res.data.success) {
                alert.success(res.data.success);
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
            <div className="container pt-5 pl-5 pb-0 pr-5">
                <h1 className="h3 mb-2 text-gray-800">{t('module.orders.page_add_lable')} #{currentOrder}</h1>
                <h6 className="pb-2">
                    <Moment calendar={calendarStrings}>{createAt}</Moment> 
                    <span className={`${statusOrder == 'Open' ? 'bg-primary' : 'bg-danger'} ml-2 pl-2 pr-2 rounded-15 text-light`}>{statusOrder}</span>
                </h6>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{t('general.update')} {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <h4>{t('module.orders.order_details')}</h4>
                                <div className="row border rounded-10 m-0 p-3">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="txt-product">{t('module.orders.select_product')}</label>
                                            <span className={`float-right ${fulfillmentStatus == 'Fulfilled' ? 'bg-primary text-light' : 'bg-warning text-dark'} pl-2 pr-2 rounded-15`}>{fulfillmentStatus}</span>
                                            <div className="table-responsive text-nowrap">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">{t('general.image')}</th>
                                                            <th scope="col">{t('module.orders.title_product')}</th>
                                                            <th scope="col">{t('module.orders.price')}</th>
                                                            <th scope="col">{t('module.orders.quantity')}</th>
                                                            <th scope="col">{t('module.orders.total_price')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            selectedProdList.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                    <td><a href={`${prefixAdmin}/edit/${item.id}`}><img src={item.feature_image} width="30" alt={item.title} /></a></td>
                                                                    <td>
                                                                        <a href={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.title}</a>
                                                                        <br></br>
                                                                        <sub>{t('module.orders.color')}: {item.color_selected}</sub>
                                                                        <br></br>
                                                                        <sub>{t('module.orders.size')}: {item.size_selected}</sub>
                                                                    </td>
                                                                    <td>
                                                                        {currencyCode == '$' ? currencyCode : ''}&nbsp;
                                                                        <NumberFormat thousandSeparator={true} displayType={'text'} value={item.price}/>
                                                                        &nbsp;{currencyCode != '$' ? currencyCode : ''}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>
                                                                        {currencyCode == '$' ? currencyCode : ''}&nbsp;
                                                                        <NumberFormat thousandSeparator={true} displayType={'text'} value={item.total_price}/>
                                                                        &nbsp;{currencyCode != '$' ? currencyCode : ''}
                                                                    </td>
                                                                </tr>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="d-flex align-items-end justify-content-end text-primary mt-2">
                                                <span className={`${paymentStatus == 'Paid' ? 'd-flex align-items-center bg-primary text-light' : 'bg-warning text-dark'} mr-2 pl-2 pr-2 rounded-15`}>{paymentStatus}</span>
                                                <label className="m-0">{t('module.orders.total_price')}:</label>
                                                <span>{currencyCode == '$' ? currencyCode : ''}&nbsp;
                                                    <NumberFormat thousandSeparator={true} displayType={'text'} value={totalPrice}/>
                                                    &nbsp;{currencyCode != '$' ? currencyCode : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="txt-description">{t('module.orders.notes')}</label>
                                            <textarea 
                                            className={`form-control`}
                                            id="txt-note"
                                            value={notes}
                                            onChange={(e) => onChangeNotes(e)}
                                            >
                                            </textarea>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                    <h4>{t('module.orders.payment_info')}</h4>
                                    <div className="row border rounded-10 m-0 p-3">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="slt-payment-method">{t('module.orders.payment_method')}</label>
                                                <select
                                                className={`form-control`}
                                                id="slt-payment-method"
                                                onChange={(e) => onChangePaymentMethod(e)}
                                                >
                                                    {
                                                        paymentMethodList.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.title} selected={ paymentMethod == item.title ? true : null}>{item.title}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="slt-status-order">{t('module.orders.status_order')}</label>
                                                <select
                                                className={`form-control`}
                                                id="slt-status-order"
                                                onChange={(e) => onChangeStatusOrder(e)}
                                                >
                                                    {
                                                        statusOrderList.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.title} selected={ statusOrder == item.title ? true : null}>{item.title}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="slt-payment-status">{t('module.orders.payment_status')}</label>
                                                <select
                                                className={`form-control`}
                                                id="slt-payment-status"
                                                onChange={(e) => onChangePaymentStatus(e)}
                                                >
                                                    {
                                                        paymentStatusList.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.title} selected={ paymentStatus == item.title ? true : null}>{item.title}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                 <label htmlFor="slt-fulfillment-status">{t('module.orders.fulfillment_status')}</label>
                                                <select
                                                className={`form-control`}
                                                id="slt-fulfillment-status"
                                                onChange={(e) => onChangeFulfillmentStatus(e)}
                                                >
                                                    {
                                                        fulfillmentStatusList.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.title} selected={ fulfillmentStatus == item.title ? true : null}>{item.title}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <h4>{t('module.orders.customer_info')}</h4>
                        <div className="border rounded-10 m-0 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-name">{t('module.orders.full_name')}</label>
                                <br></br>
                                <span className="text-primary">{firstName}&nbsp;{lastName}</span>
                            </div>
                            <hr></hr>
                            <div className="form-group">
                                <label htmlFor="input-phone">{t('module.orders.phone_number')}</label>
                                <span className="float-right text-info cursor-pointer"><sub onClick={(e) => onChangePhoneInfo(e, phoneNumber)}>{t('general.edit')}</sub></span>
                                <br></br>
                                <NumberFormat id="txt-phone" format="+84 (###) ###-####" allowEmptyFormatting mask="_" displayType={'text'} value={phoneNumber}/>
                                <NumberFormat id="input-phone" className="form-control d-none" onChange={(e) => onChangePhoneNumber(e)} format="+84 (###) ###-####" mask="_" value={phoneNumber}/>
                            </div>
                            <hr></hr>
                            <div className="form-group">
                                <label htmlFor="input-email">{t('module.orders.email')}</label>
                                <span className="float-right text-info cursor-pointer"><sub onClick={(e) => onChangeEmailInfo(e)}>{t('general.edit')}</sub></span>
                                <br></br>
                                <span id="txt-email">{email}</span>
                                <input
                                    type="email"
                                    className="form-control d-none"
                                    id="input-email"
                                    value={email}
                                    onChange={(e) => onChangeEmail(e)}
                                />
                            </div>
                            <hr></hr>
                            <div className="form-group">
                                <label htmlFor="input-address">{t('module.orders.shipping_address')}</label>
                                <span className="float-right text-info cursor-pointer"><sub onClick={(e) => onChangeAddressInfo(e)}>{t('general.edit')}</sub></span>
                                <br></br>
                                <span id="txt-address">{shippingAddress}</span>
                                <textarea
                                rows="3"
                                className="form-control d-none"
                                id="input-address"
                                value={shippingAddress}
                                onChange={(e) => onChangeShippingAddress(e)}
                                ></textarea>
                            </div>
                            <hr></hr>
                            <div className="form-group">
                                <label htmlFor="txt-city-country">{t('module.orders.city')}/{t('module.orders.country')}</label>
                                <br></br>
                                <span className="font-weight-bold">{city}/{country}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EditPage;