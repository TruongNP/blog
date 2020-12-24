import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useAlert } from "react-alert";
import {useTranslation} from "react-i18next";

function MediaItem(props) {

    const {t, i18n} = useTranslation('common');
    const alert = useAlert();

    const { currentMediaList, firstItem, lastItem, deleteMedia } = props;
    return (
        currentMediaList.slice(firstItem, lastItem).map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        <div className="form-check pl-0">
                        <input type="checkbox" className="form-check-input filled-in" id={`check-${item.id}`} />
                        <label className="form-check-label small text-uppercase card-a-secondary" htmlFor={`check-${item.id}`}></label>
                        </div>
                    </th> 
                    <td><img src={item.src} width="50" alt={item.title} /></td>
                    <td><a className="text-primary">{item.file_name}</a></td>
                    <td>{item.src}</td>
                    <td>{item.size}</td>
                    <td>{item.type}</td>
                    <td>
                        <button id={`media-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteMedia(item.id)}} >{t('general.delete')}</button>
                        <CopyToClipboard text={item.src}
                        onCopy={() => alert.success('Copied')}>
                        <button className="btn bg-primary btn-sm m-0 py-1 px-2 mr-1 text-light">{t('general.copy')}</button>
                        </CopyToClipboard>
                    </td>
                </tr>
            )
        })
    )
} 

export default MediaItem;