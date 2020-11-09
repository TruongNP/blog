import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '../../../data/admin/menu';
import ItemMenu from './ItemMenu';                                  
import SubMenu from './SubMenu';
import { BrowserRouter as Router } from "react-router-dom";


function SideBar() {
    const prefixAdmin = 'admin';
    
    return (
        <Router>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">My App</div>
                </a>

                <hr className="sidebar-divider my-0" />
                {
                    Menu.map( (item, key) => (
                        <li className="nav-item" key={key}>
                            <ItemMenu slug={`/${prefixAdmin}/${item.slug}`} name={item.name} id={item.id} />
                            <SubMenu prefix={`/${prefixAdmin}`} subMenu={item.sub_menu} parentId={item.id} />
                        </li>
                    ))
                }

                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        </Router>
    );
}

export default SideBar;

if (document.getElementById('sidebar')) {
    ReactDOM.render(<SideBar />, document.getElementById('sidebar'));
}