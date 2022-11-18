import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const Sidebar = () => {
    <>
        <div className="sidebar">
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars />
            </Link>
        </div>
    </>
}

export default Sidebar;