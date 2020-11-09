import React, { useState  } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import { useAlert } from "react-alert";
import Loader from '../../loader';

function AddPage() {
    const alert = useAlert();

    const [selectedFile, setSelectedFile] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [vendor, setVendor] = useState('');
    const [collection, setCollection] = useState([]);
    const [tags, setTags] = useState([]);
    const [submiting, setSubmiting] = useState(false);

    const onDrop = (picture) => {
        const file = picture[0];
        setSelectedFile(file)
    }
    
    const onChangTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangDescription = (e) => {
        setDescription(e.editor.getData());
    }

    const onChangProductType = (e) => {
        setProductType(e.target.value)
    }
    
    const onChangVendor = (e) => {
        setVendor(e.target.value)
    }

    const onChangCollection = (e) => {
        if(e.target.value.trim() != '') {
            setCollection([...collection, e.target.value])
            e.target.value = ''
        }
    }
    const removeCollection = (indexToRemove) => {
        const colResult = collection.filter((t, index) => index != indexToRemove)
        setCollection(colResult)
    }

    const onChangTags = (e) => {
        if(e.target.value.trim() != '') {
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
    }
    const removeTags = (indexToRemove) => {
        const tagsResult = tags.filter((t, index) => index != indexToRemove)
        setTags(tagsResult)
    }

    const submitForm = () => {
        var data = new FormData();
        data.append('file', selectedFile);
        data.append('title', title);
        data.append('description', description);
        data.append('product_type', productType);
        data.append('vendor', vendor);
        data.append('collection', collection);
        data.append('tags', tags);

        setSubmiting(true)

        axios.post('/api/v1/products', data, {
            
        }).then(res => {
            setSubmiting(false)
            alert.success('Product has been saved');
        }).catch((err)=>{
            setSubmiting(false)
            alert.error('There was an error sending!');
            
        })
    }

    return (
        <main className="main">
            <div className="container-fluid pt-5 pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">Add New Products</h1>
                <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}>Go Back</a>
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
                                    className="form-control"
                                    id="txt-title"
                                    onChange={(e) => {onChangTitle(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txt-description">Description</label>
                                <CKEditor 
                                activeClass="p10" 
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
                            <h3>Feature Image</h3>
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
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-product-type">Product Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-product-type"
                                onChange={(e) => {onChangProductType(e)}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-vendor">Vendor</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-vendor"
                                onChange={(e) => {onChangVendor(e)}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-collection">Collection</label>
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
                            <label htmlFor="txt-tags">Tags</label>
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
                        <div className="form-group text-right">
                        <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>Save {submiting == true ? <Loader with="20" /> : null}</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddPage;