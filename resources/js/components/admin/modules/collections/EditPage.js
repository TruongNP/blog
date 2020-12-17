import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import { useAlert } from "react-alert";
import Loader from '../../loader';
import { Status } from '../../../../data/admin/collections';

function AddPage() {
    const alert = useAlert();

    var pathName = window.location.pathname;
    let idArr = pathName.split('/');
    const id = idArr[idArr.length - 1]

    const [selectedFile, setSelectedFile] = useState([]);
    const [products, setProducts] = useState([]);
    const [featureImage, setFeatureImage] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [submiting, setSubmiting] = useState(false);
    const [errors, setErrors] = useState([]);

    const getCollections = () => {
        axios.get(`/api/v1/collection/${id}`).then(res => {
            const collection = res.data;

            setFeatureImage(collection.feature_image);
            setTitle(collection.title);
            setSlug(collection.slug);
            setDescription(collection.description);
            setStatus(collection.status);
        });
    }

    const getProducts = () => {
        axios.get('/api/v1/products').then(res => {
            setProducts(res.data.products);
        })
    }

    useEffect(() => {
        getCollections();
        getProducts();
    },[]);

    const productInCollection = products.filter(p => p && p.collection.filter(c => c && c.replaceAll(' ', '-').toLowerCase() === slug));

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

        axios.post('/api/v1/collection/edit', data, {
            
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
                <h1 className="h3 mb-2 text-gray-800">Add New Collections</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> Go Back</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>Save {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="txt-title">Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="txt-title"
                                    value={title}
                                    onChange={(e) => {onChangeTitle(e)}}
                                />
                                <div className="invalid-feedback">{errors.title ? errors.title : ''}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-description">Description</label>
                                <CKEditor 
                                activeclassName="p10" 
                                content={description} 
                                events={{
                                    "change": onChangDescription
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-products">Products</label>
                                <div className="row border rounded-10 m-0 p-3">
                                    <div className="col-12">
                                        <div className="products">
                                        {
                                            productInCollection.map((item, index) => {
                                                return (
                                                    <div key={index} className="product__item border-bottom mb-2 pb-2">
                                                        <a href={`/admin/product/edit/${item.id}`} className="d-flex align-items-center">
                                                            <span>#{item.id}</span>
                                                            <div className="d-flex align-items-center ml-4">
                                                                <img src={item.feature_image} className="border rounded-5" width="40" />
                                                                <div className="ml-4">
                                                                    <h5 className="text-primary">{item.title}</h5>
                                                                    <span className="text-dark font-weight-100">{item.status}</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                )
                                            })
                                        }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <h4>Feature Image</h4>
                            <div className="input-group">
                            <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
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
                            <label htmlFor="slt-status">Status</label>
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