import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function StoreInfo(props) {

    const [storeLogo, setStoreLogo] = useState('');
    const [storeName, setStoreName] = useState('');

    function getGeneralSetting() {
        axios.get(`/api/v1/settings/general`).then(res => {
            const generalSetting = res.data;

            if(generalSetting.length > 0) {
                setStoreLogo(generalSetting[0].store_logo);
                setStoreName(generalSetting[0].store_name);
            }

            
        })
    }

    useEffect(() => {
        getGeneralSetting();
    },[]);
    
    return (
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className={`sidebar-brand-icon ${storeLogo != '' ? 'd-block' : 'd-none'}`}>
                <img src={storeLogo} width="40" />
            </div>
            <div className="sidebar-brand-text">{storeName != '' ? storeName : 'My Store'}</div>
        </a>
    );
}

export default StoreInfo;

if (document.getElementById('store-info')) {
    ReactDOM.render(<StoreInfo />, document.getElementById('store-info'));
}
