import React from 'react'; 
import { Link } from "react-router-dom";

function SubMenu(prop) {
    const subMenu = prop.subMenu;
    const prefix = prop.prefix;
    
    return (
        <div className="collapsible-body">
            <ul className="list-unstyled">
            {
                subMenu.map( (item, key) => (
                    <li key={key}>
                        <Link to={`${prefix}/${item.slug}`} className="waves-effect">{item.name}</Link>
                    </li>
                ))
            }
            </ul>
        </div>

    )
};

export default SubMenu;