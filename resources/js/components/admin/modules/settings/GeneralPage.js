import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import { timeZoneList } from '../../../../data/admin/timezone';
import { Language } from '../../../../data/admin/language';
import { currencyList } from '../../../../data/admin/currency';
import Loader from '../../loader';
import ModalUpload from '../../modalUpload';
import {useTranslation} from "react-i18next";

function GeneralPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();
    
    const [submiting, setSubmiting] = useState(false);
    const [fileSelectedInMedia, setFileSelectedInMedia] = useState([]);
    const [id, setId] = useState('');
    const [storeName, setStoreName] = useState('');
    const [accountEmail, setAccountEmail] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [legalName, setLegalName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [currency, setCurrency] = useState('');
    const [currencyCode, setCurrencyCode] = useState('');
    const [language, setLanguage] = useState('en');

    function getGeneralSetting() {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            if(generalSetting.length > 0) {
                setId(generalSetting[0].id);

                if(generalSetting[0].store_logo != null) {
                    setFileSelectedInMedia([...fileSelectedInMedia, generalSetting[0].store_logo]);
                }
                else {
                    setFileSelectedInMedia([]);
                }

                if(generalSetting[0].store_name != null) {
                    setStoreName(generalSetting[0].store_name);
                }
                else {
                    setStoreName('');
                }
                
                if(generalSetting[0].account_email != null) {
                    setAccountEmail(generalSetting[0].account_email);
                }
                else {
                    setAccountEmail('');
                }
    
                if(generalSetting[0].sender_email != null) {
                    setSenderEmail(generalSetting[0].sender_email);
                }
                else {
                    setSenderEmail('');
                }
    
                if(generalSetting[0].legal_name != null) {
                    setLegalName(generalSetting[0].legal_name);
                }
                else {
                    setLegalName('');
                }
    
                if(generalSetting[0].phone != null) {
                    setPhone(generalSetting[0].phone);
                }
                else {
                    setPhone('');
                }
    
                if(generalSetting[0].address != null) {
                    setAddress(generalSetting[0].address);
                }
                else {
                    setAddress('');
                }
    
                if(generalSetting[0].city != null) {
                    setCity(generalSetting[0].city);
                }
                else {
                    setCity('');
                }
    
                if(generalSetting[0].country != null) {
                    setCountry(generalSetting[0].country);
                }
                else {
                    setCountry('');
                }
    
                if(generalSetting[0].timezone != null) {
                    setTimeZone(generalSetting[0].timezone);
                }
                else {
                    setTimeZone('');
                }
    
                if(generalSetting[0].currency != null) {
                    setCurrency(generalSetting[0].currency);
                }
                else {
                    setCurrency('');
                }

                if(generalSetting[0].currency_code != null) {
                    setCurrencyCode(generalSetting[0].currency_code);
                }
                else {
                    setCurrencyCode('');
                }

                if(generalSetting[0].language != null) {
                    setLanguage(generalSetting[0].language);
                }
                else {
                    setLanguage('');
                }
            }
            
            
        });

    };


    const onChangeStoreName = (e) => {
        setStoreName(e.target.value)
    };

    const onChangeAccountEmail = (e) => {
        setAccountEmail(e.target.value)
    };

    const onChangeSenderEmail = (e) => {
        setSenderEmail(e.target.value)
    };

    const onChangeLegalName = (e) => {
        setLegalName(e.target.value)
    };

    const onChangePhone = (e) => {
        setPhone(e.target.value)
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

    const onChangeTimeZone = (e) => {
        setTimeZone(e.target.value);
    };

    const onChangeCurrency = (e) => {
        setCurrencyCode(e.target[e.target.selectedIndex].getAttribute('data-currency-code'));
        setCurrency(e.target.value);
    };

    const onChangeCurrencyCode = (e) => {
        setCurrencyCode(e.target.value);
    };

    const onChangelanguage = (e) => {
        setLanguage(e.target.value);
    };

    const submitForm = () => {

        var url = '';
        var data = new FormData();
        data.append('store_logo', fileSelectedInMedia[0]);
        data.append('store_name', storeName);
        data.append('account_email', accountEmail);
        data.append('sender_email', senderEmail);
        data.append('legal_name', legalName);
        data.append('phone', phone);
        data.append('address', address);
        data.append('city', city);
        data.append('country', country);
        data.append('timezone', timeZone);
        data.append('currency', currency);
        data.append('currency_code', currencyCode);
        data.append('language', language);

        setSubmiting(true);

        if(id != '') {
            data.append('id', id);
            url = `/api/v1/settings/general/update`;
        }
        else {
            url = '/api/v1/settings/general';
        }

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
    };

    useEffect(() => {
        getGeneralSetting();
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
                <h1 className="h3 mb-2 text-gray-800 d-flex align-items-center">{t('module.general_settings.page_lable')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{id != '' ? t('general.update') : t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.general_settings.store_details')}</h5>
                        <span>{t('module.general_settings.store_sub_detail')}</span>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-title">{t('module.general_settings.store_logo')}</label>
                                <ModalUpload onchangeFileSelected={setFileSelectedInMedia} buttonName={fileSelectedInMedia.length > 0 ? t('module.general_settings.change_logo') : t('module.general_settings.select_logo')}/>
                                <div className={`store-logo ${fileSelectedInMedia.length > 0 ? 'd-block' : 'd-none' }`}>
                                    <img src={fileSelectedInMedia[0]} className="border rounded-5" alt="Logo" height="60" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-title">{t('module.general_settings.store_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-store-name"
                                    onChange={(e) => {onChangeStoreName(e)}}
                                    value={storeName}
                                />
                            </div>
                            <div className="row m-0">
                                <div className="col-6 form-group p-0 pr-2">
                                    <label htmlFor="txt-title">{t('module.general_settings.account_email')}</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="txt-account-email"
                                        onChange={(e) => {onChangeAccountEmail(e)}}
                                        value={accountEmail}
                                    />
                                </div>
                                <div className="col-6 form-group p-0 pl-2">
                                    <label htmlFor="txt-sender-email">{t('module.general_settings.sender_email')}</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="txt-sender-email"
                                        onChange={(e) => {onChangeSenderEmail(e)}}
                                        value={senderEmail}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.general_settings.store_address')}</h5>
                        <span>{t('module.general_settings.store_sub_address')}</span>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-legal-name">{t('module.general_settings.legal_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-legal-name"
                                    onChange={(e) => {onChangeLegalName(e)}}
                                    value={legalName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-phone">{t('module.general_settings.phone')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-phone"
                                    onChange={(e) => {onChangePhone(e)}}
                                    value={phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-address">{t('module.general_settings.address')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-address"
                                    onChange={(e) => {onChangeAddress(e)}}
                                    value={address}
                                />
                            </div>
                            <div className="row m-0">
                                <div className="col-6 form-group p-0 pr-2">
                                    <label htmlFor="txt-city">{t('module.general_settings.city')}</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="txt-city"
                                        onChange={(e) => {onChangeCity(e)}}
                                        value={city}
                                    />
                                </div>
                                <div className="col-6 form-group p-0 pl-2">
                                    <label htmlFor="txt-country">{t('module.general_settings.country')}</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        id="txt-country"
                                        onChange={(e) => {onChangeCountry(e)}}
                                        value={country}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="slt-time-zone">{t('module.general_settings.timezone')}</label>
                                <select
                                className={`form-control`}
                                id="slt-time-zone"
                                onChange={(e) => {onChangeTimeZone(e)}} 
                                value={timeZone}
                                >
                                    {
                                        timeZoneList.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value} selected={timeZone == item.value ? true : null}>{item.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.general_settings.store_currency')}</h5>
                        <span>{t('module.general_settings.store_sub_currency')}</span>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="row m-0">
                                <div className="col-8 form-group p-0 pr-2">
                                    <label htmlFor="slt-currency">{t('module.general_settings.currency')}</label>
                                    <select
                                    className={`form-control`}
                                    id="slt-currency"
                                    onChange={(e) => {onChangeCurrency(e)}} 
                                    value={currency}
                                    >
                                    {
                                            currencyList.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value} data-currency-code={item.code} selected={currency == item.value ? true : null} >{item.title}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span>{t('module.general_settings.sub_currency')}</span>
                                </div>
                                <div className="col-4 form-group p-0 pl-2">
                                <label htmlFor="txt-currency-code">{t('module.general_settings.currency_code')}</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        readOnly={true}
                                        id="txt-currency-code"
                                        onChange={(e) => {onChangeCurrencyCode(e)}}
                                        value={currencyCode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.general_settings.store_language')}</h5>
                        <span>{t('module.general_settings.store_sublanguage')}</span>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                        <div className="form-group">
                                <label htmlFor="slt-language">{t('module.general_settings.language')}</label>
                                <select
                                className={`form-control`}
                                id="slt-language"
                                onChange={(e) => {onChangelanguage(e)}} 
                                value={language}
                                >
                                    {
                                        Language.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value} selected={language == item.value ? true : null}>{item.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-end"><button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{id != '' ? t('general.update') : t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button></div>
            </div>
        </main>
    )
}

export default GeneralPage;