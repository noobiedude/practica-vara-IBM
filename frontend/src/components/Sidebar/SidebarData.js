import React from 'react';
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

// This is where the routes are and some more data on them

export const SidebarData= [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        className: 'nav-text'  
    },
    {
        title: 'Route2',
        path: '/feed',
        icon: <IoIcons.IoIosPaper/>,
        className: 'nav-text'  
    },
    {
        title: 'Route3',
        path: '/route3',
        icon: <IoIcons.IoIosPaper/>,
        className: 'nav-text'  
    },{
        title: 'Route4',
        path: '/route4',
        icon: <IoIcons.IoIosPaper/>,
        className: 'nav-text'  
    },{
        title: 'Route5',
        path: '/route5',
        icon: <IoIcons.IoIosPaper/>,
        className: 'nav-text'  
    },{
        title: 'Route6',
        path: '/route6',
        icon: <IoIcons.IoIosPaper/>,
        className: 'nav-text'  
    },
]