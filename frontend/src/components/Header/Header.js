import Login from "../Login/Login";
import Home from "../Home/Home";
import Feed from "../Feed/Feed";
import { NavLink } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";


const headersData = [
  {
    label: "Home",
    href: "/",
    component: Home,
  },
  {
    label: "Jobs",
    href: "/feed",
    component: Feed,
  },
];

const useStyles = makeStyles(() => ({
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
  header: {
    backgroundColor: "#5F9EA0",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Monserrat",
    fontWeight: 300,
    color: "#FFFEFE",
    textAlign: "left",
  },
  Login: {
    fontFamily: "Monserrat",
    fontWeight: 300,
    color: "#FFFEFE",
  },
  logout: {
    fontFamily: "Monserrat",
    fontWeight: 300,
    color: "#FFFEFE",
  },
  menuButton: {
    fontFamily: "Monserrat",
    fontWeight: 300,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const DisplayDesktop = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let history = useHistory();

    const logout = () => {
      localStorage.removeItem("user");
      history.push({ pathname: "/" });
      window.location.reload();
    };

    return (
      <Toolbar className={toolbar}>
        {hireStudLogo}
        <div>{getMenuButtons()}</div>
        <div style={{ color: "inherit" }}>
          {!currentUser ? (
            <NavLink to={`/login`} style={{ textDecoration: "none" }}>
              <Button style={{ color: "#ADFF2F" }}>Login</Button>
            </NavLink>
          ) : (
            <div>
            <NavLink to={`/addPost`} style={{ textDecoration: "none", color: "5F9EA0" }}>
               <Button disabled style={{ color: "white" }}>
                Add Post
               </Button>
             </NavLink>
              <NavLink to={`/userprofile`} style={{ textDecoration: "none" }}>
                <Button disabled style={{ color: "white" }}>
                  {currentUser.name}
                </Button>
              </NavLink>
              <Button onClick={logout} style={{ color: "#ADFF2F" }}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    );
  };

  const DisplayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let history = useHistory();

    const logout = () => {
      localStorage.removeItem("user");
      history.push({ pathname: "/" });
      window.location.reload();
    };

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}
          <div style={{ color: "inherit" }}>
          {!currentUser ? (
            <NavLink to={`/login`} style={{ textDecoration: "none" }}>
              <Button style={{ color: "#ADFF2F"}}>
                Login
              </Button>
            </NavLink>
          ) : (
            <div>
            <NavLink to={`/addPost`} style={{ textDecoration: "none", color: "5F9EA0" }}>
               
               <Button disabled style={{ color: "5F9EA0" }}>
                Add Post
               </Button>
             </NavLink>
              <NavLink to={`/userprofile`} style={{ textDecoration: "none", color: "5F9EA0" }}>
               
                <Button disabled style={{ color: "5F9EA0" }}>
                  {currentUser.name}
                </Button>
              </NavLink>
              
              <Button
                onClick={logout}
                style={{ color: "#ADFF2F" }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        </div>
        </Drawer>

        <div>{hireStudLogo}</div>

        {/* <div style={{ color: "inherit" }}>
          {!currentUser ? (
            <NavLink to={`/login`} style={{ textDecoration: "none" }}>
              <Button style={{ color: "#ADFF2F", position: "right" }}>
                Login
              </Button>
            </NavLink>
          ) : (
            <div>
              <NavLink to={`/userprofile`} style={{ textDecoration: "none" }}>
                <Button disabled style={{ color: "white" }}>
                  {currentUser.name}
                </Button>
              </NavLink>
              <Button
                onClick={logout}
                style={{ color: "#ADFF2F", justifyContent: "space-between" }}
              >
                Logout
              </Button>
            </div>
          )}
        </div> */}
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href, component }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const hireStudLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      <a href="/" style={{ color: "inherit" , textDecoration: "none" }}>
        HireStud{" "}
      </a>
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href, component }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? DisplayMobile() : DisplayDesktop()}
      </AppBar>
    </header>
  );
}
