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
import Login from "./Login/Login"
import Icon from '@material-ui/core/Icon';
import AccessibleForwardOutlinedIcon from '@material-ui/icons/AccessibleForwardOutlined';
import {ReactComponent as ReactLogo} from '../Resources/HireStudLogo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const classes = useStyles();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

//   const [image] = React.useState(pic);


  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="sidebar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          {/* HEADER IS HERE */}
          <NavLink
          className={classes.link}
                to={`/`}
                style={{ textDecoration: "none" }}
              >
                {/* <AccessibleForwardOutlinedIcon fontSize={"large"} color={'secondary'}/> */}

                <ReactLogo />

          </NavLink>
          <Toolbar variant="dense">
            {!currentUser ? (
              <NavLink
                className={classes.link}
                to={`/login`}
                style={{ textDecoration: "none" }}
              >
                <Button color="secondary">Login</Button>
              </NavLink>
            ) : (
              <div>
                <Button disabled>{currentUser.username}</Button>
                <Button onClick={logout} color="secondary">
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
          {/* HEADER IS HERE */}
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar} >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <Switch>
        <Route path="/login" exact component={Login} />
    </Switch>
    </>
  );
}

export default Sidebar;
