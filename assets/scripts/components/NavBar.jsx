// Ce composant est la barre de navigation du site Web.
// On commence par importer les dépendances nécessaires (React, logo)

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/moduleLogo.png";

const NavBar = () => {

  return (
      <div id="body-pd">
          {/* Ajout de la barre supérieure servant d'en-tête pour le logo, le bouton pour agrandir la barre latérale et d'éventuelles informations supplémentaires */} 
          <header className="header" id="header">
              <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"/> </div>
              <div className="header_img"> <img src={logo} className='header_img' alt="logo"></img> </div>
          </header>

          {/* Ajout de la barre latérale servant d'accès aux différentes pages */} 
          <div className="l-navbar" id="nav-bar">
              <nav className="nav">
                  <div> 
                    {/* Redirection vers accueil */} 
                    <NavLink 
                        className="nav_logo bx bx-layer nav_logo-icon nav_logo-name"
                        to="/#">
                        Accueil
                    </NavLink>

                      <div className="nav_list"> 
                          {/* Redirection vers la page des modules */} 
                          <a href="/#/modules" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Modules</span> </a> 
                          {/* Redirection vers la page des informations */} 
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

// On exporte notre barre de navigation
export default NavBar;