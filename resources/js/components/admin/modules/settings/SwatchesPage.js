import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import ModalUpload from '../../modalUpload';
import { ChromePicker } from 'react-color';
import Loader from '../../loader';
import {useTranslation} from "react-i18next";

function SwatchesPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [submiting, setSubmiting] = useState(false);
    const [colorActive, setColorActive] = useState('');
    const [fileSelectedInMedia, setFileSelectedInMedia] = useState([]);
    const [swatches, setSwatches] = useState([]);
    const [swatchName, setSwatchName] = useState('');
    const [swatchColor, setSwatchColor] = useState('#fff');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [updateColor, setUpdateColor] = useState(false);
    const [updateColorId, setUpdateColorId] = useState('');
    const [errors, setErrors] = useState([]);

    const removeSwatchImage = () => {
        setFileSelectedInMedia([])
    };

    const handleClickColorPicker = () => {
        setDisplayColorPicker(!displayColorPicker)
    };
    
    const handleClose = () => {
        setDisplayColorPicker(!displayColorPicker)
    }; 

    const onChangeSwatchName = (e) => {
        setSwatchName(e.target.value)
    };

    const onChangeSwatchColor = (color, e) => {
        setSwatchColor(color.hex)
    };

    const  getSwatches = () => {
        axios.get('/api/v1/swatches').then(res => {
            setSwatches(res.data);
        })
    };

    const handleChangeComplete = (color) => {
        setSwatchColor(color.hex)
    };

    const getColorById = (id) => {
        const colorHandle = swatches.find(s => s && s.id == id);

        setUpdateColorId(id);
        setUpdateColor(true);
        setColorActive(id);
        setSwatchName(colorHandle.color_name);
        if(colorHandle.color_image != 'undefined') {
            setFileSelectedInMedia([colorHandle.color_image]);
        }
        setSwatchColor(colorHandle.color_code);
    };

    const currentColor = {
        background: swatchColor
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }

    const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    }

    const submitForm = () => {
        var swatchImage = fileSelectedInMedia[0];
        var data = new FormData();
        data.append('color_name', swatchName);
        data.append('color_image', swatchImage );
        data.append('color_code', swatchColor);

        setSubmiting(true)

        axios.post('/api/v1/swatches/add', data, {
            
        }).then(res => {
            setSubmiting(false)
            if(res.data.error) {
                alert.error(res.data.error);
                setErrors(res.data.error_detail);
            }
            else if(res.data.success) {
                alert.success(res.data.success);
                setErrors([]);
                setSwatchName('');
                setSwatchColor('#fff');
                setFileSelectedInMedia([]);
                getSwatches();
            }
        }).catch((err)=>{
            setSubmiting(false);
            alert.error("There was an error sending");
        })
    };

    const resetForm = () => {
        setUpdateColorId('');
        setUpdateColor(false);
        setColorActive('');
        setSwatchName('');
        setSwatchColor('#fff');
        setFileSelectedInMedia([]);
    };

    const updateSwatchColor = () => {
        var swatchImage = fileSelectedInMedia[0];
        var data = new FormData();
        data.append('id', updateColorId);
        data.append('color_name', swatchName);
        data.append('color_image', swatchImage );
        data.append('color_code', swatchColor);

        setSubmiting(true)

        axios.post('/api/v1/swatches/update', data, {
            
        }).then(res => {
            setSubmiting(false)
            if(res.data.error) {
                alert.error(res.data.error);
                setErrors(res.data.error_detail);
            }
            else if(res.data.success) {
                alert.success(res.data.success);
                getSwatches();
            }
        }).catch((err)=>{
            setSubmiting(false);
            alert.error("There was an error sending");
        })
    };

    useEffect(() => {
        getSwatches();
    },[]);

    return (
        <main className="main">
            <div className="container pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800 d-flex align-items-center">{t('module.swatches.page_lable')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <h5 className="text-dark">{t('module.swatches.swatch_list')}</h5>
                        <div className="swatches-list list-group">
                            {
                                swatches.map((item, index) => {
                                    return (
                                        <a key={index} href="#" id={`color-${item.id}`} 
                                        className={`color-option d-flex align-items-center list-group-item list-group-item-action text-uppercase p-2 ${colorActive == item.id ? 'active' : ''}`} 
                                        onClick={() => getColorById(item.id)}>
                                            <label style={{ background: item.color_code }} className={`border rounded-5 m-0 mr-2 p-3 ${item.color_image == 'undefined' ? '' : 'd-none'}`}></label>
                                            <img src={item.color_image} width="35" height="35" className={`border rounded-5 mr-2 ${item.color_image == 'undefined' ? 'd-none' : ''}`} />
                                            {item.color_name}
                                        </a>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                    <div className="col-8">
                        <h5 className="text-dark">{updateColor == true ? t('general.update') : t('general.add_new')}</h5>
                        <div className="bg-white border rounded-5 p-3">
                        <div className="form-group">
                                <label htmlFor="txt-swatch-name">{t('module.swatches.swatch_name')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.color_name ? 'is-invalid' : ''}`}
                                    id="txt-swatch-name"
                                    onChange={(e) => {onChangeSwatchName(e)}}
                                    value={swatchName}
                                />
                                <div className="invalid-feedback">{errors.color_name ? errors.color_name : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-swatch-image">{t('module.swatches.swatch_image')}</label>
                                <ModalUpload onchangeFileSelected={setFileSelectedInMedia} buttonName={fileSelectedInMedia.length > 0 ? t('module.swatches.change_image') : t('module.swatches.select_image')}/>
                                <div className={`store-logo ${fileSelectedInMedia.length > 0 ? 'd-block' : 'd-none' }`}>
                                    <img src={fileSelectedInMedia[0]} className="border rounded-5" alt="Logo" width="35" height="35" />
                                    <span className="position-absolute ml-1 text-danger cursor-pointer" onClick={() => removeSwatchImage()}><i className="fa fa-times ml-1"></i></span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-swatch-color">{t('module.swatches.swatch_color')}</label>
                                <br></br>
                                <button className="border rounded-5 p-3" style={currentColor} onClick={ () => handleClickColorPicker() }></button>
                                { displayColorPicker ? <div style={ popover }>
                                <div style={ cover } onClick={() => handleClose() }/>
                                <ChromePicker
                                color={swatchColor}
                                onChange={onChangeSwatchColor} 
                                onChangeComplete={handleChangeComplete} />
                                </div> : null }
                            </div>
                        </div>
                        <div className="float-right mt-4">
                            <div className={updateColor == false ? 'd-flex' : 'd-none'}>
                                <button className={`btn bg-light text-dark mr-3`} onClick={() => {resetForm()}}> {t('module.swatches.reset')}</button>
                                <button className={`btn btn-primary bg-primary`} onClick={() => {submitForm()}}> {t('general.add_new')} {submiting == true ? <Loader with="20" /> : null}</button>
                            </div>
                            <div className={updateColor == true ? 'd-flex' : 'd-none'}>
                                <button className={`btn bg-light text-dark mr-3`} onClick={() => {resetForm()}}> {t('general.cancel')}</button>
                                <button className={`btn btn-primary bg-primary`} onClick={() => {updateSwatchColor()}}> {t('general.update')} {submiting == true ? <Loader with="20" /> : null}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SwatchesPage;