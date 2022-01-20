import React from 'react';
import logo from '../../../logo.svg';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.scss';
import Sidebar from '../Sidebar/sidebar';

function Navbar() {
	
    React.useEffect(() => {
        const abortControl = new AbortController();

        if(typeof window !== 'undefined'){

            const M = require('materialize-css');

            var elem = document.querySelector('#menu-bar')

            M.Sidenav.init(elem, {
                edge: "left",
                preventScrolling: true
            })

        }
        return () => { abortControl.abort(); }

    }, [])

	return (
		<header className={styles["header"]}>
			<div className={styles["navbar-fixed"] + " navbar-fixed"}>
				<nav className={styles["desktop-nav"]} id="navbar">
					<NavLink to="/" className={styles["brand-logo"]} id="brand-logo">
						<img src={logo} alt="Logo" />
						Bank Details
					</NavLink>
					<a href="#!" data-target="menu-bar" className={styles["sidenav-trigger"] + " sidenav-trigger"}>
						<i className="fa fa-bars"></i>
					</a>
				</nav>
			</div>
			<div id="menu-bar" className="sidenav">
				<Sidebar />
			</div>
		</header>
	);
}

export default Navbar;
