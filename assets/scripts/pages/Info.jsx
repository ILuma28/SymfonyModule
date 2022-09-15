{/* Ajout de logo et importation de React (et 2 hooks si nécessaires mais ils ne le seront pas ici) */}

import React, { useState, useEffect } from "react";
import React_picture from "../../images/react.png";
import Bootstrap_picture from "../../images/bootstrap.png";

const Info = () => { 

  return (
    <>
      {/* Introduction en haut de page */}
      <div className="container">
        <h1 className="jumbotron-heading">Informations sur le projet</h1>
        <p className="lead text-muted">
          Cette page a pour but de donner des informations supplémentaires sur le projet que vous êtes en train de consulter. <br/> 
          Tout d'abord, il a été réalisé dans le but de tester mes compétences en développement Web pour intégrer la startup WeBreathe en tant que développeur FullStack. <br/>
          Vous trouverez alors ci-dessous les technologies que j'ai utilisé et pourquoi avoir utilisé celles-ci.
        </p>
      </div>
    
      {/* Affichage des différentes technologies au sein d'une div container sous forme de 3 colonnes contenant chacune une petite carte qui explique le choix des technologies. */}
      <div className="container">
        <div className="row">
          {/* Colonne Symfony */}
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img className="card-img-top" src="https://symfony.com/logos/symfony_black_03.png" alt="Symfony" />
              <div className="card-body">
                <p className="card-text">
                  Tout d'abord, j'ai décidé d'utiliser le framework PHP Symfony car j'ai déjà pu travailler avec cette technologie et cela s'avère très utile pour le développement web grâce à ses nombreux composants.
                  J'ai alors utilisé par exemple Doctrine pour la base de données et APIPlatform pour intéragir simplement avec celle-ci.
                </p>
              </div>
            </div>
          </div>
          {/* Colonne ReactJS */}
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img className="card-img-top" src={React_picture} alt="ReactJS" id="reactInfo"/>
              <div className="card-body">
                <p className="card-text">
                  Ensuite, j'utilise ReactJS qui est une bibliothèque JavaScript (et non un framework !) car cela permettra d'exploiter la fonctionnalité de composants.
                  Cela permettra par exemple d'ajouter notre barre de navigation grâce à un composant afin qu'elle soit présente dans tout le projet sans devoir la mettre dans chaque fichier de page.
                </p>
              </div>
            </div>
          </div>
          {/* Colonne Bootstrap */}
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img className="card-img-top" src={Bootstrap_picture} alt="Bootstrap" id="bootstrapInfo"/>
              <div className="card-body">
                <p className="card-text">Puis je complète ces technologies avec de l'HTML, du CSS et du Bootstrap pour mettre en page mes données et les styliser de manière rapide et structurée.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};


// On exporte le contenu de notre page d'informations
export default Info;