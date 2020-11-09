import React from 'react'; 
import { Link } from "react-router-dom";

function ItemMenu(props) {
    return (
        <Link to={props.slug} className={`nav-link collapsed`}  data-toggle="collapse" data-target={`#menu-${props.id}`} aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>{props.name}</span> 
        </Link>
    )
};

export default ItemMenu;