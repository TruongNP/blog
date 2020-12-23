import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import axios from 'axios';
import { Role } from '../../../../data/admin/role';
import Loader from '../../loader';
import ModalUpload from '../../modalUpload';
import NumberFormat from 'react-number-format';
import {useTranslation} from "react-i18next";

function AddPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [submiting, setSubmiting] = useState(false);
    const [fileSelectedInMedia, setFileSelectedInMedia] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    };

    const onChangePassword = (e) => {
        var value = e.target.value;

        setPassword(value)
        if(value == confirmPassword)
            setErrorPassword(false)
        else 
            setErrorPassword(true)
    };

    const onChangeConfirmPassword = (e) => {
        var value = e.target.value;
        setConfirmPassword(value);
        
        if(value == password)
            setErrorPassword(false)
        else 
            setErrorPassword(true)
    };

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    };

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    };

    const onChangeWebsite = (e) => {
        setWebsite(e.target.value)
    };

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    };

    const onChangeCity = (e) => {
        setCity(e.target.value)
    };

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    };

    const onChangeRole = (e) => {
        setRole(e.target.value)
    };

    const submitForm = () => {

        var url = '';
        var data = new FormData();
        data.append('avata', fileSelectedInMedia[0]);
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('phone_number', phoneNumber);
        data.append('website', website);
        data.append('email', email);
        data.append('password', password);
        data.append('address', address);
        data.append('city', city);
        data.append('country', country);
        data.append('role', role);

        setSubmiting(true);

        url = `/api/v1/user/add`;

        if(errorPassword == false) {
            axios.post(url, data, {
                        
            }).then(res => {
                setSubmiting(false)
                if(res.data.error) {
                    alert.error(res.data.error);
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
        }
        else {
            setSubmiting(false);
            alert.error('Passwords are not the same');
        }
        
    };

    useEffect(() => {
    },[]);

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
            <div className="container pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800 d-flex align-items-center">{t('module.customers.page_add_lable')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.customers.profile_info')}</h5>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-avata">{t('module.customers.profile_picture')}</label>
                                <ModalUpload onchangeFileSelected={setFileSelectedInMedia} buttonName={fileSelectedInMedia.length > 0 ? t('module.customers.change_picture') : t('module.customers.select_picture')}/>
                                <div className={`store-logo ${fileSelectedInMedia.length > 0 ? 'd-block' : 'd-none' }`}>
                                    <img src={fileSelectedInMedia[0]} className="border rounded-5" alt="Logo" height="60" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-name">{t('module.customers.first_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-first-name"
                                    onChange={(e) => {onChangeFirstName(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-last-name">{t('module.customers.last_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-last-name"
                                    onChange={(e) => {onChangeLastName(e)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.customers.contact_info')}</h5>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-phone-number">{t('module.customers.phone_number')}</label>
                                <NumberFormat id="input-phone" className="form-control" onChange={(e) => onChangePhoneNumber(e)} format="+84 (###) ###-####" mask="_" value={phoneNumber}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-website">{t('module.customers.website')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-website"
                                    onChange={(e) => {onChangeWebsite(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-address">{t('module.customers.address')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-address"
                                    onChange={(e) => {onChangeAddress(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-city">{t('module.customers.city')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-city"
                                    onChange={(e) => {onChangeCity(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-country">{t('module.customers.country')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-country"
                                    onChange={(e) => {onChangeCountry(e)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.customers.login_info')}</h5>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-email">{t('module.customers.email')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-email"
                                    onChange={(e) => {onChangeEmail(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-password">{t('module.customers.password')}</label>
                                <input
                                    type="password"
                                    className={`form-control`}
                                    id="txt-password"
                                    onChange={(e) => {onChangePassword(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-confirm-password">{t('module.customers.confirm_password')}</label>
                                <input
                                    type="password"
                                    className={`form-control border ${errorPassword == true ? 'is-invalid' : 'is-valid'}`}
                                    id="txt-confirm-password"
                                    onChange={(e) => {onChangeConfirmPassword(e)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.customers.profile_role')}</h5>
                    </div>
                    <div className="col-8">
                    <div className="bg-white border rounded-5 p-3">
                        <div className="form-group">
                                <label htmlFor="slt-role">{t('module.customers.role')}</label>
                                <select
                                className={`form-control`}
                                id="slt-role"
                                onChange={(e) => {onChangeRole(e)}} 
                                >
                                    {
                                        Role.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value} >{item.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-end"><button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button></div>
            </div>
        </main>
    )
}

export default AddPage;