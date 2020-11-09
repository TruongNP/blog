import React from 'react'; 
import { Link } from "react-router-dom";

function SubMenu(prop) {
    const subMenu = prop.subMenu;
    const prefix = prop.prefix;
    const parentId = prop.parentId;
    
    return (
        <div id={`menu-${parentId}`} className="collapse" aria-labelledby="headingTwo" data-parent={`#menu-${parentId}`}>
            <ul className="bg-white py-2 collapse-inner rounded navbar-nav">
            {
                subMenu.map( (item, key) => (
                    <li key={key}>
                        <Link to={`${prefix}/${item.slug}`} className="collapse-item">{item.name}</Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
};

export default SubMenu;