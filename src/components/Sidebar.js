import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

const Sidebar = () => {

    const [navbar, setNavbar] = useState(false);
    const showNavbar = () => setNavbar(!navbar)
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="sidebar">
                    <Link path="#" className='menu-bars'>
                        <div onClick={showNavbar}>{!navbar ? <FaIcons.FaBars /> : <AiIcons.AiOutlineClose />}
                        </div>
                    </Link>
                </div>
                <nav className={navbar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showNavbar}>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span className='nav-title-box'>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}
export default Sidebar;