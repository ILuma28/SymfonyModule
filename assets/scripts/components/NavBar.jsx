// Ce composant est la barre de navigation du site Web.
// On commence par importer les dépendances nécessaires (React, logo)

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/module_logo.png";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);

      if (window.innerWidth > 500) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
      <div id="body-pd">
          <header className="header" id="header">
              <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
              <div className="header_img"> <img src={logo} className='header_img' alt="logo"></img> </div>
          </header>
          <div className="l-navbar" id="nav-bar">
              <nav className="nav">
                  <div> 

                    <NavLink 
                        className="nav_logo bx bx-layer nav_logo-icon nav_logo-name"
                        to="/#">
                        Accueil
                    </NavLink>

                      <div className="nav_list"> 
                          <a href="/#/modules" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Modules</span> </a> 
                          <a href="/#/info" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">En savoir plus</span> </a> 
                      </div>
                    
                  </div> 
              </nav>
          </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type="text/Javascript" src="{{asset('js/index.js')}}"></script>
        </div>
  );
};  

export default NavBar;