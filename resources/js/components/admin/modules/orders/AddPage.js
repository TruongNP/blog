import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import Loader from '../../loader';
import NumberFormat from 'react-number-format';
import { paymentMethodList, statusOrderList, paymentStatusList, fulfillmentStatusList } from '../../../../data/admin/order';
import ChangeProductOption from '../../modalChangeProductOption';
import {useTranslation} from "react-i18next";

function AddPage() {
    const {t, i18n} = useTranslation('common');
    const alert = useAlert();
    const prefixAdmin = "/admin/products";

    const [submiting, setSubmiting] = useState(false);
    const [currencyCode, setCurrencyCode] = useState('');

    const [resultFilter, setResultFilter] = useState(false);
    const [allCustomer, setAllCustomer] = useState([]);
    const [customerFilter, setCustomerFilter] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [filterFullName, setFilterFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    //product
    const [allProduct, setAllProduct] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [resultProdFilter, setResultProdFilter] = useState(false);
    const [filterProductName, setFilterProductName] = useState('');
    const [selectedProdList, setSelectedProdList] = useState([]);
    
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [statusOrder, setStatusOrder] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [fulfillmentStatus, setFulfillmentStatus] = useState('');

    const getAllCustomer = () => {
        axios.get(`/api/v1/user`).then(res => {
            setAllCustomer(res.data);
        })
    }

    const getAllProduct = () => {
        axios.get(`/api/v1/products`).then(res => {
            setAllProduct(res.data.products);
        })
    }

    const onChangeCustomer = (e) => {
        var filterName = e.target.value.toLowerCase();
        setFilterFullName(e.target.value);

        if(filterName.length == 0) 
            setCustomerFilter([]);
        else {
            const resultFilter = allCustomer.filter(u => u && u.filter_name.toLowerCase().startsWith(filterName));
            setCustomerFilter(resultFilter);
            setResultFilter(true);
        }
    };

    const onBlurCustomer = () => {
        setTimeout(() => {
            setResultFilter(false)
        }, 200);
    }

    const selectedCustomer = (id) => {
        const curSelected = allCustomer.find(u => u && u.id == id);
        
        setFirstName(curSelected.first_name);
        setLastName(curSelected.last_name);
        setPhoneNumber(curSelected.phone_number);
        setEmail(curSelected.email);
        setShippingAddress(curSelected.address);
        setCity(curSelected.city);
        setCountry(curSelected.country);
        setFilterFullName(curSelected.filter_name);
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeShippingAddress = (e) => {
        setShippingAddress(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    // product 
    const onChangeSelectProduct = (e) => {
        var prodName = e.target.value.toLowerCase();

        setFilterProductName(e.target.value);

        if(prodName.length == 0) 
            setProductFilter([]);
        else {
            const resultFilter = allProduct.filter(p => p && p.title.toLowerCase().startsWith(prodName));
            setProductFilter(resultFilter);
            setResultProdFilter(true);
        }
    };

    const selectedProduct = (id) => {
        const product = allProduct.find(p => p && p.id == id);
        const variants = JSON.parse(product.variants).variants;
        const newProductItem = {
            id: product.id,
            feature_image: product.feature_image,
            title: product.title,
            price: product.price,
            quantity: 1,
            total_price: product.price,
            variant_selected: {
                color: variants[0].color,
                size: variants[0].size,
            },
            variants: variants
        }

        setSelectedProdList([
            ...selectedProdList, newProductItem
        ]);
        setFilterProductName('');
        setResultProdFilter(false);
    }

    const updateVariantSelected = (indexToUpdate, color, size) => {

        selectedProdList[indexToUpdate].variant_selected.color = color;
        selectedProdList[indexToUpdate].variant_selected.size = size;

        setSelectedProdList([...selectedProdList]);

        console.log('selectedProdList:', selectedProdList);
    }

    const onBlurProduct = () => {
        setFilterProductName('');
        setTimeout(() => {
            setResultProdFilter(false);
        }, 200);
    }

    const deleteSelectedProduct = (indexToRemove) => {

        const prodListAfterRemove = selectedProdList.filter((p, i) => p && i != indexToRemove);
        setSelectedProdList(prodListAfterRemove);
    };

    const updateTotalPriceItem = (index) => {
        const prodUpdate = selectedProdList[index];
        const total = prodUpdate.quantity*prodUpdate.price;

        prodUpdate.total_price = total;

        setSelectedProdList([...selectedProdList]);
    }

    const quantityMinus = (index) => {
        const prodAfterUpdate = selectedProdList[index];
        
        if( prodAfterUpdate.quantity > 1)
            prodAfterUpdate.quantity -= 1;

        setSelectedProdList([...selectedProdList]);
        updateTotalPriceItem(index);
    }

    const onChangeQuantity = (e, index) => {
        let quantity = e.target.value;
        const prodAfterUpdate = selectedProdList[index];
        prodAfterUpdate.quantity = quantity;

        setSelectedProdList([...selectedProdList]);
        updateTotalPriceItem(index);
    }

    const quantityPlus = (index) => {
        const prodAfterUpdate = selectedProdList[index];
        prodAfterUpdate.quantity += 1;

        setSelectedProdList([...selectedProdList]);
        updateTotalPriceItem(index);
    }

    const totalPrice = selectedProdList.reduce((a, b) => a + (b["total_price"] || 0), 0);

    const getGeneralSetting = () => {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            setCurrencyCode(generalSetting[0].currency_code);
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

    const getSwatches = () => {
        axios.get('/api/v1/swatches').then(res => {
          window.swatches = res.data;
        })
      };

    useEffect(() => {
        getSwatches();
        getAllCustomer();
        getAllProduct();
        getGeneralSetting();
    },[]);

    const submitForm = () => {
        var orderItem = '';

        if(selectedProdList.length > 0) {
            const prodLength = selectedProdList.length - 1;
            orderItem = '{"orders":[';
            selectedProdList.forEach((item, index) => {
                if(index != prodLength) {
                    orderItem += '{"id":"'+item.id+'","feature_image":"'+item.feature_image+'","title":"'+item.title+'","price":"'+item.price+'","quantity":"'+item.quantity+'","total_price":"'+item.total_price+'","color_selected":"'+item.variant_selected.color+'","size_selected":"'+item.variant_selected.size+'"},'; 
                }
                else {
                    orderItem += '{"id":"'+item.id+'","feature_image":"'+item.feature_image+'","title":"'+item.title+'","price":"'+item.price+'","quantity":"'+item.quantity+'","total_price":"'+item.total_price+'","color_selected":"'+item.variant_selected.color+'","size_selected":"'+item.variant_selected.size+'"}'; 
                }
                
            });
            orderItem += ']}';
        }

        var data = new FormData();
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('phone_number', phoneNumber);
        data.append('contact_email', email);
        data.append('shipping_address', shippingAddress);
        data.append('city', city);
        data.append('country', country);
        data.append('note', notes);
        data.append('payment_method', paymentMethod);
        data.append('order_items', orderItem);
        data.append('total', totalPrice);
        data.append('status', statusOrder);
        data.append('payment_status', paymentStatus);
        data.append('fulfillment_status', fulfillmentStatus);

        setSubmiting(true)

        axios.post('/api/v1/orders/add', data, {
            
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
                <h1 className="h3 mb-2 text-gray-800">{t('module.orders.page_add_lable')}</h1>
                <div id="scroll-top" className="col-12 mb-3 p-0 d-flex justify-content-between">
                    <nav className="nav">
                        <a className="nav-link pl-0" onClick={() => window.history.back()}><i className="fas fa-arrow-left"></i> {t('general.go_back')}</a>
                    </nav>
                    <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>{t('general.add_new')} {submiting == true ? <Loader with="20" /> : null}</button>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <h4>{t('module.orders.order_details')}</h4>
                                <div className="row border rounded-10 m-0 p-3">
                                    <div className="col-12">
                                        <div className="form-group position-relative">
                                            <label htmlFor="txt-product">{t('module.orders.select_product')}</label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                id="txt-select-product"
                                                value={ filterProductName.length > 0 ? filterProductName : '' }
                                                onChange={(e) => onChangeSelectProduct(e)}
                                                onBlur={(e) => onBlurProduct(e)}
                                            />
                                            <div className={`dropdown-below-input list-group ${resultProdFilter == true ? 'd-block' : 'd-none'}`}>
                                            {
                                                productFilter.map((item, index) => {
                                                    return (
                                                        <div key={index} className="d-flex align-items-center list-group-item list-group-item-action cursor-pointer" onClick={() => {selectedProduct(item.id)}}>
                                                            <img src={item.feature_image} width="30" alt={item.title} />
                                                            <span className="ml-3">{item.title}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="txt-product">{t('module.orders.product_selected')}</label>
                                            <div className="table-responsive text-nowrap">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">{t('general.image')}</th>
                                                            <th scope="col">{t('module.orders.title_product')}</th>
                                                            <th scope="col">{t('module.orders.price')}</th>
                                                            <th scope="col">{t('module.orders.quantity')}</th>
                                                            <th scope="col">{t('module.orders.total_price')}</th>
                                                            <th scope="col">{t('general.action')}</th>
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
                                                                        <sub>{t('module.orders.color')}: {item.variant_selected.color}</sub>
                                                                        <br></br>
                                                                        <sub>{t('module.orders.size')}: {item.variant_selected.size}</sub>
                                                                    </td>
                                                                    <td>
                                                                        {currencyCode == '$' ? currencyCode : ''}&nbsp;
                                                                        <NumberFormat thousandSeparator={true} displayType={'text'} value={item.price}/>
                                                                        &nbsp;{currencyCode != '$' ? currencyCode : ''}</td>
                                                                    <td>
                                                                        <div className="row">
                                                                            <a className="btn border col-3 p-0 minus" onClick={() => quantityMinus(index)}>-</a>
                                                                            <input type="text" className="col-4 form-control text-center p-0 quantity" onChange={(e) => onChangeQuantity(e, index)} value={item.quantity} />
                                                                            <a className="btn border col-3 p-0 plus" onClick={() => quantityPlus(index)}>+</a>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {currencyCode == '$' ? currencyCode : ''}&nbsp;
                                                                        <NumberFormat thousandSeparator={true} displayType={'text'} value={item.total_price}/>
                                                                        &nbsp;{currencyCode != '$' ? currencyCode : ''}</td>
                                                                    <td className="d-flex">
                                                                        <a href="#" className="text-danger mr-3" onClick={() => {deleteSelectedProduct(index)}} ><i className="fa fa-times ml-1"></i></a>
                                                                        <ChangeProductOption 
                                                                        indexToUpdate={index}
                                                                        variants={item.variants} 
                                                                        sizeSelected={item.variant_selected.size} 
                                                                        colorSelected={item.variant_selected.color}
                                                                        updateVariantSelected={updateVariantSelected} />
                                                                    </td>
                                                                </tr>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className={`align-items-end justify-content-end text-primary mt-2 ${totalPrice == 0 ? 'd-none' : 'd-flex'}`}>
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
                                                                <option key={index} value={item.title}>{item.title}</option>
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
                                                                <option key={index} value={item.title}>{item.title}</option>
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
                                                                <option key={index} value={item.title}>{item.title}</option>
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
                                                                <option key={index} value={item.title}>{item.title}</option>
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
                        <div className="form-group position-relative">
                            <h4>{t('module.orders.customer_info')}</h4>
                            <label htmlFor="txt-customer">{t('module.orders.filter_customer')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-customer"
                                value={ filterFullName.length > 0 ? filterFullName : '' }
                                onChange={(e) => onChangeCustomer(e)}
                                onBlur={(e) => onBlurCustomer(e)}
                            />
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
                            <label htmlFor="txt-first-name">{t('module.orders.first_name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-first-name"
                                value={firstName}
                                onChange={(e) => onChangeFirstName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-last-name">{t('module.orders.last_name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-last-name"
                                value={lastName}
                                onChange={(e) => onChangeLastName(e)}
                            />
                        </div>
                        <div className="form-group">
                            <h4>{t('module.orders.contact_info')}</h4>
                            <label htmlFor="txt-phone">{t('module.orders.phone_number')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-phone"
                                value={phoneNumber}
                                onChange={(e) => onChangePhoneNumber(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-email">{t('module.orders.email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                id="txt-email"
                                value={email}
                                onChange={(e) => onChangeEmail(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-address">{t('module.orders.shipping_address')}</label>
                            <textarea
                            rows="3"
                            className="form-control"
                            id="txt-address"
                            value={shippingAddress}
                            onChange={(e) => onChangeShippingAddress(e)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-city">{t('module.orders.city')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-city"
                                value={city}
                                onChange={(e) => onChangeCity(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txt-country">{t('module.orders.country')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="txt-country"
                                value={country}
                                onChange={(e) => onChangeCountry(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddPage;