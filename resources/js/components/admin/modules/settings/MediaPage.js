import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import MediaItem from '../../MediaItem';
import Pagination from '../../Pagination';
import ModalUpload from '../../modalUpload';
import {useTranslation} from "react-i18next";

function MediaPage() {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const [mediaList, setMediaList] = useState([]);
    const totalItem = mediaList.length;
    const [doneUpload, setDoneUpload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;

    const onClickPagination = (currentPage) => {
        
        setCurrentPage(currentPage);
    };

    const deleteMedia = (id) => {
        const media = document.getElementById('media-'+id+'');
        var value = media.innerText;
        media.innerText = value + '...';
        axios.get(`/api/v1/upload/delete/${id}`).then(res => {
            alert.success('Media deleted');
            getMediaList();
            media.innerText = value;
        }).catch(err => {
            media.innerText = value;
        })
    };

    const  getMediaList = () => {
        axios.get('/api/v1/uploads').then(res => {
            setMediaList(res.data);
            setDoneUpload(false);
        })
    };

    if(doneUpload == true) {
        getMediaList();
    }

    useEffect(() => {
        getMediaList();
    },[]);

    return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">{t('module.media.page_lable')}</h1>
            <div className="col-12 mb-3 p-0 d-flex justify-content-between">
                <nav className="nav">
                    <a className="nav-a active mr-3" href="#">{t('general.export')}</a>
                    <a className="nav-a mr-3" href="#">{t('general.import')}</a>
                    <a className="nav-a  mr-3" href="#">{t('general.more_action')}</a>
                </nav>
                <ModalUpload doneUpload={setDoneUpload} onlyUpload={true} className="btn btn-primary bg-primary" buttonName={t('general.add_new')}/>
            </div>
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check pl-0">
                                <input type="checkbox" className="form-check-input filled-in" id="check-all"  />
                                <label className="form-check-label small text-uppercase card-a-secondary"  htmlFor="check-all"></label>
                                </div>
                            </th>
                            <th scope="col">{t('general.image')}</th>
                            <th scope="col">{t('module.media.title')}</th>
                            <th scope="col">{t('module.media.source')}</th>
                            <th scope="col">{t('module.media.size')}</th>
                            <th scope="col">{t('module.media.type')}</th>
                            <th scope="col">{t('general.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    <MediaItem currentMediaList={ mediaList } firstItem={ firstItem } lastItem={ lastItem } deleteMedia={deleteMedia} />
                    </tbody>
                </table>
                <Pagination totalItem={ totalItem } itemsPerPage={ itemsPerPage } paginate={ onClickPagination } currentPage={ currentPage } />
            </div>
        </div>
    )
}

export default MediaPage;