import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link , Switch , Route} from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.scss";
import { IconContext } from "react-icons";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login"
import Icon from '@material-ui/core/Icon';
import AccessibleForwardOutlinedIcon from '@material-ui/icons/AccessibleForwardOutlined';
import Logo from "../Logo/Logo"



function Sidebar(){
  return(
    <div>
   <NavBar />
    </div>
  )
}

function NavBar(){

    const [open, setOpen] = useState(false);

  return( <div>
    <nav>
    
    
      <div className="logo">
              <NavLink
       
                to={`/`}
                style={{ textDecoration: "none" }}
              >

          
            <Logo className="logo"/>

          </NavLink>
      
      </div>
      <ul className="nav-links"  style={{transform: open ? "translateX(0px)" : "" }}>
      
          <li> <a href="/">Home</a></li>
          <li> <a href="/feed" >Route2</a></li>
          <li> <a href="#">Route3</a></li>
          <li> <a href="">Route4</a></li>
          <li> <a href="/login">Login</a></li>
          
      </ul>
      <i onClick={() => setOpen(!open)}  className="fas fa-bars burger"></i>
     
    </nav>
   
  </div>

  )
}

export default Sidebar;