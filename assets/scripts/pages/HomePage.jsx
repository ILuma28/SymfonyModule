// Cette page est la page d'accueil du site Web.
// On commence par importer les dépendances nécessaires (React, fond de page)

import React from "react";
import module_background from "../../images/background.png";

function HomePage() {
  return (
    // Puis j'ajoute le titre et le fond de page 
    <div className="page-header align-items-start min-vh-100 FlexContainer"> <img src={module_background} className='page-header align-items-start min-vh-100 FlexContainer Overlay' alt="module_background"></img>
        <h1 id = 'accueil-titre'> Gestion de Modules </h1>
        <h1 id = "Bienvenue">Bienvenue sur ce logiciel de gestion de Modules IoT</h1>
    </div>
    );
};

// On exporte le contenu de notre page d'accueil
export default HomePage;