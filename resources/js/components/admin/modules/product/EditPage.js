import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import { useAlert } from "react-alert";
import Loader from '../../loader';
import ModalUpload from '../../modalUpload';
import ProductOption from '../../productOption';
import NumberFormat from 'react-number-format';
import {useTranslation} from "react-i18next";

function EditPage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    var pathName = window.location.pathname;
    let idArr = pathName.split('/');
    const id = idArr[idArr.length - 1]

    const [selectedFile, setSelectedFile] = useState([]);
    const [featureImage, setFeatureImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [vendor, setVendor] = useState('');
    const [collection, setCollection] = useState([]);
    const [tags, setTags] = useState([]);
    const [submiting, setSubmiting] = useState(false);
    const [fileSelectedInMedia, setFileSelectedInMedia] = useState([]);
    const [displayVariantOption, setDisplayVariantOption] = useState(false);
    const [price, setPrice] = useState('');
    const [comparePrice, setComparePrice] = useState('');
    const [productCode, setProductCode] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('');
    const [errors, setErrors] = useState([]);
    const [variants, setVariants] = useState([]);
    const [currencyCode, setCurrencyCode] = useState('');
    const [currency, setCurrency] = useState('');

    const getProduct = () => {
        axios.get(`/api/v1/product/${id}`).then(res => {
            const product = res.data;

            setFeatureImage(product.feature_image)
            setTitle(product.title);

            if(product.description != null) {
                setDescription(product.description);
            }
            else {
                setDescription('');
            }
            
            if(product.product_type != null) {
                setProductType(product.product_type);
            }
            else {
                setProductType('');
            }
            
            if(product.vendor != null) {
                setVendor(product.vendor);
            }
            else {
                setVendor('');
            }
            
            if(product.collection != null) {
                setCollection(product.collection.split(','));
            }

            if(product.tags != null) {
                setTags(product.tags.split(','));
            }

            if(product.price != null) {
                setPrice(product.price);
            }
            else {
                setPrice('');
            }
            
            if(product.compare_price != null) {
                setComparePrice(product.compare_price);
            }
            else {
                setComparePrice('');
            }

            if(product.product_code != null) {
                setProductCode(product.product_code);
            }
            else {
                setProductCode('');
            }

            if(product.quantity != null) {
                setTotalQuantity(product.quantity);
            }
            else {
                setTotalQuantity('');
            }
            
            if(product.variants != null) {
                setDisplayVariantOption(true);
                setVariants(JSON.parse(product.variants).variants);
            }
            if(product.media != null){setFileSelectedInMedia(product.media.split(','));}
            
        });

    };

    const getGeneralSetting = () => {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            setCurrencyCode(generalSetting[0].currency_code);
            setCurrency(generalSetting[0].currency);
        })
    }

    useEffect(() => {
        getProduct();
        getGeneralSetting();
    },[]);


    const onDrop = (picture) => {
        const file = picture[0];
        setSelectedFile(file)
    };
    
    const onChangTitle = (e) => {
        setTitle(e.target.value)
    };

    const onChangDescription = (e) => {
        setDescription(e.editor.getData());
    };

    const onChangProductType = (e) => {
        setProductType(e.target.value)
    };
    
    const onChangVendor = (e) => {
        setVendor(e.target.value)
    };

    const onChangCollection = (e) => {
        if(e.target.value.trim() != '') {
            setCollection([...collection, e.target.value])
            e.target.value = ''
        }
    };

    const removeCollection = (indexToRemove) => {
        const colResult = collection.filter((t, index) => index != indexToRemove)
        setCollection(colResult)
    };

    const onChangTags = (e) => {
        if(e.target.value.trim() != '') {
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
    };

    const removeTags = (indexToRemove) => {
        const tagsResult = tags.filter((t, index) => index != indexToRemove)
        setTags(tagsResult)
    };

    const onChangPrice = (e) => {
        var value = e.target.value.replaceAll(',', '');
        setPrice(value)
    };

    const onChangComparePrice = (e) => {
        var value = e.target.value.replaceAll(',', '');
        setComparePrice(value)
    };

    const onChangProductCode = (e) => {
        setProductCode(e.target.value)
    };

    const onChangQuantity = (e) => {
        setTotalQuantity(e.target.value)
    };

    const checkDisplayVariantOption = () => {
        if(displayVariantOption == false){
            setDisplayVariantOption(true)
        }
        else {
            setDisplayVariantOption(false)
        }
    }

    const addMoreProductOption = (e) => {
        e.preventDefault();
        const newOption = {
            color: '', 
            size: '', 
            quantity: 0
        }
        setVariants([
            ...variants, newOption
        ]);
    }

    const submitForm = () => {
        var variant_data = '';

        if(variants.length > 0) {
            const variantLength = variants.length - 1;
            variant_data = '{"variants":[';
            variants.forEach((item, index) => {
                if(index != variantLength) {
                    variant_data += '{"color":"'+item.color+'","size":"'+item.size+'","quantity":"'+item.quantity+'"},'; 
                }
                else {
                    variant_data += '{"color":"'+item.color+'","size":"'+item.size+'","quantity":"'+item.quantity+'"}'; 
                }
                
            });
            variant_data += ']}';
        }
        
        var data = new FormData();
        data.append('id', id);
        data.append('file', selectedFile);
        data.append('title', title);
        data.append('description', description);
        data.append('product_type', productType);
        data.append('vendor', vendor);
        data.append('collection', collection);
        data.append('tags', tags);
        data.append('media', fileSelectedInMedia);
        data.append('price', price);
        data.append('compare_price', comparePrice);
        data.append('product_code', productCode);
        data.append('quantity', totalQuantity);
        data.append('variants', variant_data);

        setSubmiting(true)

        axios.post('/api/v1/product/edit', data, {
            
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
            <div className="container pt-5 pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">{t('module.products.page_edit_lable')}</h1>
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
                                <label htmlFor="txt-title">{t('module.products.title')}</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="txt-title"
                                    onChange={(e) => {onChangTitle(e)}}
                                    value={title}
                                />
                                <div className="invalid-feedback">{errors.title ? errors.title : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-description">{t('module.products.description')}</label>
                                <CKEditor 
                                activeclassName="p10" 
                                content={description} 
                                uploadUrl="/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json"
                                events={{
                                    "change": onChangDescription
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-media">{t('module.products.media')}</label>
                                <ModalUpload onchangeFileSelected={setFileSelectedInMedia} buttonName={t('module.products.add_media')}/>
                                <input
                                    type="hidden"
                                    className="form-control"
                                    id="txt-media"
                                />
                                <div className={`media-list d-flex flex-wrap border rounded-10 p-2 ${fileSelectedInMedia.length > 0 ? '' : 'justify-content-center'}`}>
                                    <h4 className={`m-4 ${fileSelectedInMedia.length > 0 ? 'd-none' : 'd-block'}`}>{t('module.products.no_image_choosed')}</h4>
                                    {
                                        fileSelectedInMedia.map((item, index) => {
                                            return (
                                                <div key={index} className="media-item">
                                                    <img src={item} width="100" height="100" className="border rounded-10 object-fit-contain cursor-pointer m-2 p-2" />  
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-price">{t('module.products.pricing')}</label>
                                <div className="row border rounded-10 m-0 p-3">
                                    <div className="col">
                                        <label htmlFor="txt-price">{t('module.products.price')}</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{currency == 'VND' ? currency : currencyCode}</span>
                                            </div>
                                            <NumberFormat onChange={(e) => {onChangPrice(e)}} value={price} className="form-control" thousandSeparator={true} />
                                            <div className="input-group-append">
                                                <span className="input-group-text">{currency == 'VND' ? currencyCode : currency}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="txt-compare-price">{t('module.products.compare_price')}</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{currency == 'VND' ? currency : currencyCode}</span>
                                            </div>
                                            <NumberFormat onChange={(e) => {onChangComparePrice(e)}} value={comparePrice} className="form-control" thousandSeparator={true} />
                                            <div className="input-group-append">
                                                <span className="input-group-text">{currency == 'VND' ? currencyCode : currency}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-inventory">{t('module.products.inventory')}</label>
                                <div className="row border rounded-10 m-0 p-3">
                                    <div className="col">
                                        <label htmlFor="txt-product-code">{t('module.products.product_code')}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="txt-product-code"
                                            onChange={(e) => {onChangProductCode(e)}}
                                            value={productCode}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="txt-quantity">{t('module.products.total_quantity')}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="txt-quantity"
                                            onChange={(e) => {onChangQuantity(e)}}
                                            value={totalQuantity}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-variants">{t('module.products.variants')}</label>
                                <div className="border rounded-10 m-0 p-3">
                                    <div className="form-check pl-0">
                                        <input type="checkbox" className="form-check-input filled-in" id="check-variant" checked={displayVariantOption == true ? true : false} onChange={() => checkDisplayVariantOption()} />
                                        <label className="form-check-label small card-a-secondary text-capitalize"  htmlFor="check-variant">{t('module.products.variant_message')}</label>
                                    </div>
                                    <hr />
                                    <div id="append" className={`${displayVariantOption == true ? 'd-block' : 'd-none'}`}>
                                        <div className="row">
                                            <div className="col"> <label >{t('module.products.color')}</label></div>
                                            <div className="col"> <label >{t('module.products.size')}</label></div>
                                            <div className="col"> <label >{t('module.products.quantity')}</label></div>
                                        </div>
                                        {
                                            variants.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <ProductOption 
                                                        indexToRemove={index} 
                                                        color={item.color} 
                                                        size={item.size} 
                                                        quantity={item.quantity} 
                                                        onChangeColorName={
                                                            (colorName) =>{
                                                                variants[index].color = colorName;
                                                                setVariants([
                                                                    ...variants, 
                                                                ])
                                                            }
                                                        }
                                                        onChangeSizeName={
                                                            (sizeName) =>{
                                                                variants[index].size = sizeName;
                                                                setVariants([
                                                                    ...variants, 
                                                                ])
                                                            }
                                                        }
                                                        onChangeQuantity={
                                                            (quantity) =>{
                                                                variants[index].quantity = quantity;
                                                                setVariants([
                                                                    ...variants, 
                                                                ]);
                                                            }
                                                        }
                                                        onBlurQuantity={
                                                            (quantity) => {
                                                                if(displayVariantOption == true) {
                                                                    variants[index].quantity = quantity;
                                                                    setVariants([
                                                                        ...variants, 
                                                                    ]);
                                                                    const total = variants.reduce((a, b) => parseInt(a) + (parseInt(b["quantity"]) || 0), 0);
                                                                    setTotalQuantity(total);
                                                                }
                                                            }
                                                        }
                                                        removeVariants={
                                                            (indexToRemove) => {
                                                                if(variants.length != 1) {
                                                                    const listOption = variants.filter((v, i) => v && i != indexToRemove);
                                                                    setVariants(listOption);
                                                                }
                                                                
                                                            }
                                                        }/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button className={`btn mt-3 ${displayVariantOption == true ? 'd-block' : 'd-none'}`} onClick={(e) => addMoreProductOption(e)}>Add More Option</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <h4>{t('module.products.feature_image')}</h4>
                            <div className="input-group">
                            <ImageUploader
                            withIcon={true}
                            buttonText={t('module.products.choose_images')}
                            onChange={onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}
                            withPreview={true}
                            withLabel={false}
                            singleImage	={true}
                            />
                            <div className="d-block"><img src={featureImage} className="w-100 border rounded-10"/></div>
                            </div>
                        </div>
                        <div className="form-group">
                            <h4>{t('module.products.organization')}</h4>
                            <label htmlFor="txt-product-type">{t('module.products.product_type')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-product-type"
                                onChange={(e) => {onChangProductType(e)}}
                                value={productType}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-vendor">{t('module.products.vendor')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-vendor"
                                onChange={(e) => {onChangVendor(e)}}
                                value={vendor}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-collection">{t('module.products.collection')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-collection"
                                onKeyUp={(e) => (e.key == 'Enter' ? onChangCollection(e) : null)}
                            />
                            <div className="d-flex flex-wrap">
                                {
                                    collection.map((item, index) => (
                                        <span key={index} className="d-flex align-items-center bg-light rounded text-primary m-1 p-1">{item} 
                                            <small className="d-flex" onClick={() => removeCollection(index)}><i className="fa fa-times ml-1"></i></small>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-tags">{t('module.products.tags')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-tags"
                                onKeyUp={(e) => (e.key == 'Enter' ? onChangTags(e) : null)}
                            />
                            <div className="d-flex flex-wrap">
                                {
                                    tags.map((item, index) => (
                                        <span key={index} className="d-flex align-items-center bg-light rounded text-primary m-1 p-1">{item} 
                                            <small className="d-flex" onClick={() => removeTags(index)}><i className="fa fa-times ml-1"></i></small>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default EditPage;