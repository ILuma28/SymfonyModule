import React from "react";
import module_background from "../../images/background.png";



function HomePage() {
  return (
    <div className="page-header align-items-start min-vh-100 FlexContainer"> <img src={module_background} className='page-header align-items-start min-vh-100 FlexContainer Overlay' alt="module_background"></img>
        <h1 id = 'accueil-titre'> Gestion de Modules </h1>
        <h1 id = "Bienvenue">Bienvenue sur ce logiciel de gestion de Modules IoT</h1>
    </div>
    );
};

export default HomePage;