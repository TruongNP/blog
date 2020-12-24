import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import { useAlert } from "react-alert";
import Loader from '../../loader';
import {useTranslation} from "react-i18next";
import { Status } from '../../../../data/admin/collections';

function AddPage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [selectedFile, setSelectedFile] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [submiting, setSubmiting] = useState(false);
    const [errors, setErrors] = useState([]);

    // useEffect(() => {

    // },[]);

    const onDrop = (picture) => {
        const file = picture[0];
        setSelectedFile(file)
    };
    
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    };

    const onChangDescription = (e) => {
        setDescription(e.editor.getData());
    };

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    };
    
    
    const submitForm = () => {
        var data = new FormData();
        data.append('file', selectedFile);
        data.append('title', title);
        data.append('description', description);
        data.append('status', status);

        setSubmiting(true)

        axios.post('/api/v1/collection', data, {
            
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
                <h1 className="h3 mb-2 text-gray-800">{t('module.collections.page_add_lable')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{t('general.save')} {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="txt-title">{t('module.collections.title')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="txt-title"
                                    onChange={(e) => {onChangeTitle(e)}}
                                />
                                <div className="invalid-feedback">{errors.title ? errors.title : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-description">{t('module.collections.description')}</label>
                                <CKEditor 
                                activeclassName="p10" 
                                content={description} 
                                events={{
                                    "change": onChangDescription
                                }}
                                />
                            </div>
                            
                        </form>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <h4>{t('module.collections.feature_image')}</h4>
                            <div className="input-group">
                            <ImageUploader
                            withIcon={true}
                            buttonText={t('module.collections.choose_images')}
                            onChange={onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}
                            withPreview={true}
                            withLabel={false}
                            singleImage	={true}
                            />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-tags">{t('module.collections.status')}</label>
                            <select
                            className={`form-control`}
                            id="slt-collection-status"
                            onChange={(e) => onChangeStatus(e)}
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

                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddPage;