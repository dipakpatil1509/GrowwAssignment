import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styles from './sidebar.module.scss';

function Sidebar({className}) {
    const location = useLocation()

    function checkRoute(path){
        let clas = ""
        path.forEach(element => {
            if(matchPath({path:element},location.pathname)){
                clas = " " + styles["active"];
            }
        });
        return clas
    }

    function closeSidebar() {
        
        if(typeof window !== 'undefined'){

            const M = require('materialize-css');

            var elem = document.querySelector('#menu-bar')

            let instance = M.Sidenav.getInstance(elem)
            
            instance.close()
        }
    }

    const menu = [
        {
            title: "All Banks",
            icon: "fas fa-university",
            url: "/all-banks",
            activeOn: ["/bank-details/:ifsc_code"],
        },
        {
            title: "Favourites",
            icon: "fas fa-heart",
            url: "/favourites",
            activeOn:[]
        },
    ];

    return (
        <div className={styles["side_menu"] + " " + className}>
            <ul>
                {
                    menu.map((item, id)=>(
                        <li key={id} className={styles["items"] + checkRoute([item.url, ...item.activeOn])}>
                            <Link to={item.url} onClick={(e)=>{closeSidebar()}}>
                                <i className={item.icon}></i> {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Sidebar;
