import React from 'react';
import { Menu } from '../../../data/admin/menu';
import ItemMenu from './ItemMenu';
import SubMenu from './SubMenu';


function SideBar() {
    const prefixAdmin = 'admin';
    
    return (
            <section className="sidebar">
                <a href="#" data-activates="slide-out" className="btn btn-primary p-3 button-collapse"><i className="fas fa-bars"></i></a>

                <div id="slide-out" className="side-nav fixed">
                    <ul className="custom-scrollbar">
                        <li>
                            <div className="logo-wrapper waves-light waves-effect waves-light">
                                <a className="navbar-brand d-flex justify-content-center align-items-center dark-blue-text" href="#">
                                  <i className="fab fa-mdb fa-3x" alt="mdb logo"></i>
                                </a>
                            </div>
                        </li>
                        <li>
                            <form className="search-form" role="search">
                                <div className="form-group md-form mt-0 mb-1 d-block">
                                <input type="text" className="form-control w-100" placeholder="Search" />
                                </div>
                            </form>
                        </li>
                        <li>
                            <ul className="collapsible collapsible-accordion">
                            {
                                Menu.map( (item, key) => (
                                    <li className="menu-item" key={key}>
                                        <ItemMenu slug={`/${prefixAdmin}/${item.slug}`} name={item.name} />
                                        <SubMenu prefix={`/${prefixAdmin}/${item.slug}`} subMenu={item.sub_menu} />
                                    </li>
                                ))
                            }
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
    );
}

export default SideBar;
