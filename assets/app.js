// On commence par importer toutes les dépendances nécessaires (React, libraire de notifications, pages, composants)

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Popup from "reactjs-popup";
import "./styles/app.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modules from "./scripts/pages/Modules";
import Info from "./scripts/pages/Info";
import HomePage from "./scripts/pages/HomePage";
import NavBar from "./scripts/components/Navbar";

// Ensuite, on crée le routing de notre application. Ce qui signifie choisir la page à envoyer à l'utilisateur en fonction de l'URL saisie.
const App = () => {
    
    return (
      <>
        {/* Composant React qui permet la création du Routing */}
        <HashRouter>
          <Popup />
          <div className="row">
  
            <div className="col container-fluid p-0">
              {/* Composant React qui permet d'afficher la barre de navigation sur toutes les pages */}
              <NavBar/>
              
                <Routes>
                    
                    {/* Route pour la page d'accueil */}
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    
                    {/* Route pour la page de gestion des modules */}
                    <Route
                        path="/modules"
                        element={<Modules />}
                    />

                    {/* Route pour la page des informations sur le projet */}
                    <Route
                        path="/info"
                        element={<Info />}
                    />

                </Routes >
            </div >
          </div >
        </HashRouter >
  
      </>
  
    );
  };
  
  {/* Ici, on définit l'endroit où notre routing sera appliqué pour afficher les différentes pages. Ce sera donc la div contenant l'ID app qui est présente dans le fichier base.html.twig */}
  const rootElement = document.querySelector("#app");
  ReactDOM.render(<App />, rootElement);