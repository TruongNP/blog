import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import axios from 'axios';
import ModalUpload from '../../modalUpload';
import { Role } from '../../../../data/admin/role';
import Loader from '../../loader';
import {useTranslation} from "react-i18next";

function ProfilePage(props) {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [submiting, setSubmiting] = useState(false);
    const [fileSelectedInMedia, setFileSelectedInMedia] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');

    let id = document.getElementById("current-user-id").value;

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

    const getUserSetting = () => {
        axios.get(`/api/v1/user/${id}`).then(res => {
            const user = res.data;

            if(user.avata != null) {
                setFileSelectedInMedia([...fileSelectedInMedia, user.avata]);
            }
            else {
                setFileSelectedInMedia([]);
            }

            if(user.first_name != null) {
                setFirstName(user.first_name);
            }
            else {
                setFirstName('');
            }
            
            if(user.last_name != null) {
                setLastName(user.last_name);
            }
            else {
                setLastName('');
            }

            if(user.phone_number != null) {
                setPhoneNumber(user.phone_number);
            }
            else {
                setPhoneNumber('');
            }

            if(user.website != null) {
                setWebsite(user.website);
            }
            else {
                setWebsite('');
            }
            if(user.address != null) {
                setAddress(user.address);
            }
            else {
                setAddress('');
            }
            if(user.city != null) {
                setCity(user.city);
            }
            else {
                setCity('');
            }
            if(user.country != null) {
                setCountry(user.country);
            }
            else {
                setCountry('');
            }
        });

    };

    const submitForm = () => {

        var url = '';
        var data = new FormData();
        data.append('id', id);
        data.append('avata', fileSelectedInMedia[0]);
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('phone_number', phoneNumber);
        data.append('website', website);
        data.append('address', address);
        data.append('city', city);
        data.append('country', country);

        setSubmiting(true);

        url = `/api/v1/user/update`;

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
        getUserSetting();
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
                <h1 className="h3 mb-2 text-gray-800 d-flex align-items-center">{t('module.profile.page_lable')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{id != '' ? t('general.update') : t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.profile.profile_info')}</h5>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-avata">{t('module.profile.profile_picture')}</label>
                                <ModalUpload onchangeFileSelected={setFileSelectedInMedia} buttonName={fileSelectedInMedia.length > 0 ? t('module.profile.change_picture') : t('general.select_picture')}/>
                                <div className={`store-logo ${fileSelectedInMedia.length > 0 ? 'd-block' : 'd-none' }`}>
                                    <img src={fileSelectedInMedia[0]} className="border rounded-5" alt="Logo" height="60" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-name">{t('module.profile.first_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-first-name"
                                    onChange={(e) => {onChangeFirstName(e)}}
                                    value={firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-last-name">{t('module.profile.last_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-last-name"
                                    onChange={(e) => {onChangeLastName(e)}}
                                    value={lastName}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.profile.contact_info')}</h5>
                    </div>
                    <div className="col-8">
                        <div className="bg-white border rounded-5 p-3">
                            <div className="form-group">
                                <label htmlFor="txt-phone-number">{t('module.profile.phone_number')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-phone-number"
                                    onChange={(e) => {onChangePhoneNumber(e)}}
                                    value={phoneNumber}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-website">{t('module.profile.website')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-website"
                                    onChange={(e) => {onChangeWebsite(e)}}
                                    value={website}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-address">{t('module.profile.address')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-address"
                                    onChange={(e) => {onChangeAddress(e)}}
                                    value={address}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-city">{t('module.profile.city')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-city"
                                    onChange={(e) => {onChangeCity(e)}}
                                    value={city}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-country">{t('module.profile.country')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-country"
                                    onChange={(e) => {onChangeCountry(e)}}
                                    value={country}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.profile.profile_role')}</h5>
                    </div>
                    <div className="col-8">
                    <div className="bg-white border rounded-5 p-3">
                        <div className="form-group">
                                <label htmlFor="slt-time-zone">{t('module.profile.role')}</label>
                                <select
                                disabled={true}
                                className={`form-control`}
                                id="slt-time-zone"
                                onChange={(e) => {onChangeRole(e)}} 
                                >
                                    {
                                        Role.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value} selected={ role == item.value ? true : null}>{item.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <span>{t('module.profile.role_message')}</span>
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

export default ProfilePage;