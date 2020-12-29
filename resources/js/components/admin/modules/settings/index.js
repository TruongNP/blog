import React from 'react';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';

function MainPage() {

    const {t, i18n} = useTranslation('common');

    const prefixAdmin = '/admin/settings';

    return (
        <main className="main">
            <div className="container pl-5 pb-5 pr-5">
                <h1 className="h3 mb-2 text-gray-800">{t('module.settings.page_label')}</h1>
                <div className="row mt-4">
                    <div className="col-4 mb-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <Link to={`${prefixAdmin}/general`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-fw fa-cog"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">{t('module.settings.general')}</h6>
                                    <span className="text-secondary">{t('module.settings.sub_general')}</span>
                                </div>  
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 mb-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <Link to={`${prefixAdmin}/profile`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-user"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">{t('module.settings.account')}</h6>
                                    <span className="text-secondary">{t('module.settings.sub_account')}</span>
                                </div>  
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 mb-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <Link to={`${prefixAdmin}/media`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-image"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">{t('module.settings.media')}</h6>
                                    <span className="text-secondary">{t('module.settings.sub_media')}</span>
                                </div>  
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 mb-4">
                        <div className="item-setting bg-white border rounded-5 p-2">
                            <Link to={`${prefixAdmin}/swatches`} className="d-flex algin-items-top nav-link">
                                <div className="item-setting__icon mr-3 p-2 rounded-5 text-primary"><i className="fas fa-swatchbook"></i></div>
                                <div className="item-setting__info">
                                    <h6 className="text-primary">{t('module.settings.swatches')}</h6>
                                    <span className="text-secondary">{t('module.settings.sub_swatches')}</span>
                                </div>  
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainPage;