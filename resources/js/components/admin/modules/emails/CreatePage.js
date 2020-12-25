import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import { useAlert } from "react-alert";
import Loader from '../../loader';
import {useTranslation} from "react-i18next";

function CreatePage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [allCustomer, setAllCustomer] = useState([]);
    const [customerFilter, setCustomerFilter] = useState([]);
    const [resultFilter, setResultFilter] = useState(false);
    const [mailFrom, setMailFrom] = useState('truongnp@fabatechnology.com');
    const [mailTo, setMailTo] = useState('');
    const [subject, setSubject] = useState('');
    const [sender, setSender] = useState('Npt Shop');
    const [customer, setCustomer] = useState('Customer');
    const [message, setMessage] = useState('');
    const [submiting, setSubmiting] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const getAllCustomer = () => {
        axios.get(`/api/v1/user`).then(res => {
            setAllCustomer(res.data);
        })
    }

    useEffect(() => {
        getAllCustomer();
    },[]);

    const onChangeMailTo= (e) => {
        var filterName = e.target.value.toLowerCase();
        setMailTo(e.target.value)

        if(filterName.length == 0) 
            setCustomerFilter([]);
        else {
            const resultFilter = allCustomer.filter(u => u && u.filter_name.toLowerCase().startsWith(filterName));
            setCustomerFilter(resultFilter);
            setResultFilter(true);
        }
    };

    const onBlurMailTo = () => {
        setTimeout(() => {
            setResultFilter(false)
        }, 200);
    }

    const selectedCustomer = (id) => {
        const curSelected = allCustomer.find(u => u && u.id == id);
        
        setMailTo(curSelected.email);
        setCustomer(curSelected.filter_name);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    };

    const onChangeCustomerName = (e) => {
        setCustomer(e.target.value)
    };
    
    const onChangeMessage = (e) => {
        setMessage(e.editor.getData());
    };

    const submitForm = () => {
        var data = new FormData();
        data.append('mail_from', mailFrom);
        data.append('mail_to', mailTo);
        data.append('subject', subject);
        data.append('sender', sender);
        data.append('receive', customer);
        data.append('message', message);

        setSubmiting(true)

        axios.post('/api/v1/send-email', data, {
            
        }).then(res => {
            setSubmiting(false)
            if(res.data.error) {
                alert.error(res.data.error);
                setErrors(res.data.error_detail);
            }
            else if(res.data.success) {
                alert.success(res.data.success);
                setErrors([]);
                setMailTo('');
                setSubject('');
                setCustomer('');
                setMessage('');
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
                <h1 className="h3 mb-2 text-gray-800">{t('module.emails.page_create_label')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="txt-mail-from">{t('module.emails.mail_from')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-mail-from"
                                    disabled={true}
                                    value={mailFrom}
                                />
                            </div>
                            <div className="form-group position-relative">
                                <label htmlFor="txt-mail-to">{t('module.emails.mail_to')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.mail_to ? 'is-invalid' : ''}`}
                                    id="txt-mail-to"
                                    onChange={(e) => {onChangeMailTo(e)}}
                                    onBlur={(e) => onBlurMailTo(e)}
                                    value={mailTo}
                                />
                                <div className="invalid-feedback">{errors.mail_to ? errors.mail_to : ''}</div>
                                <div className={`dropdown-below-input list-group ${resultFilter == true ? 'd-block' : 'd-none'}`}>
                                {
                                    customerFilter.map((item, index) => {
                                        return (
                                            <a key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => {selectedCustomer(item.id)}}>
                                                <img src={item.avata} width="30" height="30" className="border rounded-circle mr-2" />
                                                {item.first_name}&nbsp;{item.last_name}
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-subject">{t('module.emails.subject')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                                    id="txt-subject"
                                    onChange={(e) => {onChangeSubject(e)}}
                                    value={subject}
                                />
                                <div className="invalid-feedback">{errors.subject ? errors.subject : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-customer">{t('module.emails.customer')}</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    id="txt-customer"
                                    onChange={(e) => onChangeCustomerName(e)}
                                    value={customer}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-description">{t('module.emails.message')}</label>
                                <CKEditor 
                                activeclassName="p10" 
                                content={message} 
                                events={{
                                    "change": onChangeMessage
                                }}
                                />
                            </div>
                            
                        </form>
                    </div>
                </div>
                <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button>
            </div>
        </main>
    )
}

export default CreatePage;