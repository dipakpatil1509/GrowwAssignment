import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styles from './sidebar.module.scss';

function Sidebar({className, setFavourite}) {
    const location = useLocation()

    const favourites = useSelector(state=>state.favourites.favourites)

    if(!favourites){
        var fav = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : []
		setFavourite(fav);
    }

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
                                {
                                    id === 1 && 
                                    <span className="right">{favourites ? favourites.length : 0}</span>
                                }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

const mapDis = (dispatch)=>{
	return{
		setFavourite:(favourites)=>{
			dispatch({type:'Set_Favourites', favourites})
		}
	}
}

export default connect(null, mapDis)(Sidebar);
