import React from 'react'; 
import { Link } from "react-router-dom";

function ItemMenu(props) {
    return (
        <Link to={`${props.slug}`} className={`collapsible-header navbar-link-2 waves-effect arrow-r d-flex align-items-center`} >
            <i className="fas fa-gem dark-blue-text"></i> {props.name}
        </Link>
    )
};

export default ItemMenu;