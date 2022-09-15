// J'importe les dépendances nécessaires (React, Notifications, Graphique, Icone)

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactBSAlert from "react-bootstrap-sweetalert";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Modal,
} from "reactstrap";
import Select from 'react-select';
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCircle);


const Modules = () => { 

  // Je crée des variables dynamiques avec le hook useState.
  //  Je pourrai ainsi changer leur valeur, ce qui actualisera la page automatiquement sans chargement
  
  // Sert pour actualiser le contenu affiché
  const [refresh, setRefresh] = useState() 

  // Stocke les modules pour exploiter les données de la BDD
  const [modules, setModules] = useState([]); 

  // Gère l'affichage des notifications
  const [alert, setAlert] = useState(); 

  // Gère l'affichage de la Pop-up d'ajout de module
  const [modalAdd, setModalAdd] = useState(false);

  // Gère l'affichage de la Pop-up de modification/suppression de module
  const [modalChange, setModalChange] = useState(false);

  // Gère l'affichage de la Pop-up de graphique d'évolution de module
  const [modalChart, setModalChart] = useState(false);

  // Stocke les informations du module en cours de modification/suppression
  let [currentModule, setCurrentModule] = useState({
    id: undefined,
    Nom: undefined,
    Type: undefined,
  });

  // Stocke les informations du module en cours de création
  let [newModule, setNewModule] = useState({
    id: undefined,
    Nom: undefined,
    Type: undefined,
  });

  // Stocke les options possibles de type de module 
  // Ici, j'ai proposé les modules thermiques et modules de vitesse 
  // mais il est possible de rajouter des options si nécessaire
  let [options, setOptions] = useState([
    {value: "Thermique", label: "Thermique"},
    {value: "Vitesse", label: "Vitesse"}
  ])

  // Stocke l'option de type de module actuellement sélectionnée
  const [selectedOption, setSelectedOption] = useState(null)

  // Stocke les données de l'historique pour générer les graphiques
  let [dataChart, setDataChart] = useState([]);

  // Stocke l'identifiant du module dont on consulte le graphique actuellement
  let [currentChart, setCurrentChart] = useState('');

  // Exécute les fonctions fetchModules() et fetchHistorique() au chargement de la page
  useEffect(() => {
    fetchModules(),
    fetchHistorique()
  }, [])

  // Exploite l'API pour récupérer les modules en BDD
  const fetchModules = async () => {
  
    try {
      // Requête HTTP GET à l'API avec la librairie Axios
      await axios
        .get("http://localhost:8000/api/modules")
        // Stocke les modules dans la variable modules
        .then((response) => {setModules(response.data["hydra:member"])} )
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }}

  // Exploite l'API pour récupérer les historiques en BDD
  const fetchHistorique = async () => {

    try {
      // Requête HTTP GET à l'API avec la librairie Axios
      await axios
        .get("http://localhost:8000/api/historique_modules")
        // Stocke le résultat dans la variable dataChart avec un format défini contenant l'id du module concerné, la valeur et la date complète de la mesure
        .then((response) => {response.data["hydra:member"].map(data => (dataChart.push({id:data.Module, value: data.Valeur, datetime: data.TimeStamp.slice(11, 19) })))} )
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }

  // Ajout d'un module en BDD avec les informations du formulaire
  const addModule = () => {
    // Requête HTTP POST à l'API avec la librairie Axios
    try {
      axios.post("http://localhost:8000/api/modules", {
        Nom: newModule.Nom,
        Type: selectedOption.value,
      })
      // Notification d'ajout réussi
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {setAlert(null), window.location.reload()}} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Module ajouté !
        </ReactBSAlert>
      ))
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      // Notification d'erreur survenue
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {setAlert(null), window.location.reload()}} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
    }
  }
  
  // Stocke les informations du module que l'on souhaite modifier dans currentModule
  // Cela permettra d'avoir une valeur par défaut dans les champs.
  // Puis, affiche la Pop-up de modification/suppression
  const handleModify = (module) => {
    console.log(dataChart)
    currentModule.id = module.id
    currentModule.Nom = module.nom
    setSelectedOption({label:module.type, value: module.type})
    setModalChange(true) // Affiche la Pop-up
  }

  // Modification d'un module en BDD avec les informations du formulaire
  const changeModule = () => {
    const headers = { 'Content-Type': 'application/merge-patch+json' }
    // Requête HTTP PATCH à l'API avec la librairie Axios
    try {
      axios.patch("http://localhost:8000/api/modules/" + currentModule.id, {
        Nom: currentModule.Nom,
        Type: selectedOption.value,
      }, 
      {headers} )
      // Notification de modification réussie
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {setAlert(null), window.location.reload()}} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Module modifié !
        </ReactBSAlert>
      ))
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      // Notification d'erreur survenue
      setAlert(
        <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {setAlert(null), window.location.reload()}} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
      )
    }
  }

  // Alerte de confirmation pour supprimer un module
  const deleteModuleSweetAlert = () => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "0px" }}
        title="Are you sure?"
        onConfirm={deleteModule}
        onCancel={() =>
          setAlert(null)
        }
        confirmBtnCssClass="danger"
        cancelBtnBsStyle="btn-secondary"
        confirmBtnText="Yes, delete it"
        cancelBtnText="Cancel"
        showCancel
        btnSize=""
      >
        You won't be able to revert this!
      </ReactBSAlert>
    )
  };

  // Suppression d'un module en BDD
  const deleteModule = () => {
    try {
      // Requête HTTP DELETE à l'API avec la librairie Axios
      axios.delete("http://localhost:8000/api/modules/" + currentModule.id)
      // Notification de suppression réussie
      .then(setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {setAlert(null), window.location.reload()}} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Module supprimé ! 
        </ReactBSAlert>
      ))
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      // Notification d'erreur survenue
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {setAlert(null), window.location.reload()}} // Recharge la page
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue ! Veuillez réessayer plus tard.
        </ReactBSAlert>
    }
  }

  // Toutes les 5 secondes pour ne pas surcharger la BDD avec trop de requêtes:
  // - Génére des données aléatoires d'état de fonctionnement et de valeur
  // - Augmente la durée de fonctionnement et le nombre de données envoyées
  const generateData = (module) => {
    // Si un intervalle (fonction qui s'exécute toutes les X secondes) n'est pas déjà
    // initialisé pour ce module :
    if (!window["interval"+module.id]) {
      window["interval"+module.id] = setInterval(() => {
        // Génère un etat de fonctionnement true ou false (10% de probabilité que le module tombe en panne)
        module.EtatMarche = (Math.random() < 0.9)
        // Augmente la durée de fonctionnement de 5 secondes
        module.DureeFonctionnement += 5
        // Augmente le nombre de données envoyées de 1
        module.NombreDonneesEnvoyees +=1
        // Si le module n'est pas en panne, génère une nouvelle valeur (de 10 à 25°C pour la température et
        // de 0 à 50 km/h pour la vitesse, les valeurs peuvent être changées si souhaité)
        if(module.EtatMarche == true) {
          if (module.Type == "Thermique") {
            module.ValeurActuelle = Math.floor(Math.random() * (25 - 10 + 1) + 10)
          }
          if (module.Type == "Vitesse") {
            module.ValeurActuelle = Math.floor(Math.random() * (50 - 0 + 1) + 0)
          }
        }else{
          module.ValeurActuelle = "/"
        }
        // Actualise l'affichage
        setRefresh(0)
        setRefresh(1)
        // Exécute la fonction autoPatchModule
        //autoPatchModule(module.id, module.EtatMarche, module.DureeFonctionnement, module.NombreDonneesEnvoyees, module.ValeurActuelle)
        }, 5000) // 5000 représente la durée entre chaque exécution de l'intervalle. (5000 ms = 5 secondes)
    }
  }

  // Modifie l'état de fonctionnement, la durée de fonctionnement, le nombre de données envoyées et la valeur actuelle
  // en fonction des données précédemment créées.
  const autoPatchModule = (id, etat, dureeFonctionnement, nombreDonneesEnvoyees, valeurActuelle) => {
    // Si la valeur actuelle est inexistante car module en panne, on stocke null
    if (valeurActuelle=="/"){
      valeurActuelle = null
    }
    const headers = { 'Content-Type': 'application/merge-patch+json' }
    try {
      // Requête HTTP PATCH à l'API avec la librairie Axios
      axios.patch("http://localhost:8000/api/modules/" + id, {
        EtatMarche: etat,
        DureeFonctionnement: dureeFonctionnement,
        NombreDonneesEnvoyees: nombreDonneesEnvoyees,
        ValeurActuelle: valeurActuelle
      }, 
      {headers} )
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
    
    // Si la valeur actuelle est inexistante car module en panne, on stocke null
    // Cela permettra de voir une cassure dans le graphique d'évolution qui marque la panne
    try {
      // Requête HTTP POST à l'API avec la librairie Axios
      axios.post("http://localhost:8000/api/historique_modules", {
        Module: "/api/modules/" + id,
        Valeur: valeurActuelle,
        TimeStamp: new Date().toISOString().slice(0, 19).replace('T', ' ') // Conversion de la date et de l'heure actuelle au format MySQL
      })
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  }

  // Attribue à la variable currentChart l'identifiant du module dont on souhaite consulter le graphique
  // Puis, affiche la Pop-up contenant le graphique
  const handleChart = (module) => {
    setCurrentChart(module.id)
    setModalChart(true)
  }

  // Le contenu du return est affiché sur la page
  return (
    <>
    {/* Affiche une alerte si la variable alert est définie. Sinon, n'affiche rien. */}
      {alert}
      {/* Tableau d'affichage des modules */}
      <div className="ModuleArray">
        <table id="modulesTable" className="table table-dark">
          <thead>
            {/* Première ligne */}
            <tr>
              {/* Colonnes contenant les titres */}
              <th>Identifiant</th>
              <th>Etat</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Valeur Actuelle</th>
              <th>Durée de fonctionnement</th>
              <th>Nombre de données envoyées</th>
              <th>Modifier</th>
              <th>Évolution</th>
            </tr>
          </thead>
          <tbody>
            {/* Pour chaque module, construis une nouvelle ligne du tableau */}
            {modules.map(module => (
              <tr key={module.id + "00"}>
                {/* Affiche l'identifiant dans la colonne correspondante */}
                <td key={module.id + "0"}>{module.id}</td>
                {/* Affiche une icone représentant l'état du module. Vert -> En marche / Rouge -> En panne */}
                {module.EtatMarche == true &&
                  <td key={module.id + "1"}><FontAwesomeIcon icon={faCircle} style={{color: "green"}}/></td>
                }
                {module.EtatMarche == false &&
                  <td key={module.id + "1"}><FontAwesomeIcon icon={faCircle} style={{color: "red"}}/></td>
                }
                {/* Affiche le nom dans la colonne correspondante */}
                <td key={module.id + "2"}>{module.Nom}</td>
                {/* Affiche le type dans la colonne correspondante */}
                <td key={module.id + "3"}>{module.Type}</td>
                {/* Affiche la valeur actuelle dans la colonne correspondante */}
                {/* Si la valeur est vide car en panne, affiche un / */}
                {/* Si c'est un module de température, ajoute °C après la valeur. Si c'est un module de vitesse, ajoute km/h */}
                <td key={module.id + "4"}>{module.ValeurActuelle}{!module.ValeurActuelle && "/"}{module.Type == "Thermique" && "°C"}{module.Type == "Vitesse" && "km/h"}</td>
                {/* Affiche la durée de fonctionnement. Initialement en secondes, elle est convertie pour être affichée en format Heures:Minutes:Secondes */}
                <td key={module.id + "5"}>
                  {Math.floor(module.DureeFonctionnement / 3600).toString().padStart(2, '0') + ':' +
                  Math.floor((module.DureeFonctionnement - (Math.floor(module.DureeFonctionnement / 3600) * 3600)) / 60).toString().padStart(2, '0') + ':' +
                  Math.floor(module.DureeFonctionnement - (Math.floor(module.DureeFonctionnement / 3600) * 3600) - (Math.floor((module.DureeFonctionnement - (Math.floor(module.DureeFonctionnement / 3600) * 3600)) / 60) * 60)).toString().padStart(2, '0')
                }
                </td>
                {/* Affiche le nombre de données envoyées dans la colonne correspondante */}
                <td key={module.id + "6"}>{module.NombreDonneesEnvoyees}</td>
                {/* Affiche le bouton Modifier/Supprimer qui appelle la fonction handleModify() lorsque cliqué en transmettant les données du module correspondant */}
                {/* Il permet alors d'afficher la Pop-up de Modification/Suppression */}
                <td key={module.id + "7"}><Button color="success" onClick={() => handleModify(module)}>Modifier / Supprimer</Button></td> 
                {/* Affiche le bouton Voir l'évolution qui appelle la fonction handleChart() lorsque cliqué en transmettant les données du module correspondant */}
                {/* Il permet alors d'afficher la Pop-up contenant le graphique */}
                <td key={module.id + "8"}><Button color="success" onClick={() => handleChart(module)}>Voir l'évolution</Button></td> 
              </tr>))}
              {/* Pour chaque module, exécute la fonction generateData pour créer des données toutes les 5 secondes */}
              {modules.map(module => (generateData(module)))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Bouton d'ajout de module qui définit modalAdd à true et donc affiche la Pop-up d'ajout */}
        <Button className="centre" color="success" onClick={() => setModalAdd(true)}>Ajouter</Button>
      </div>
      {/* Pop-up de modification de module. Est affichée lorsque modalChange = true (défini par handleModify) */}
      <Modal
        isOpen={modalChange}
        toggle={() => setModalChange(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            {/* Formulaire de modification */}
            <Form className="edit-event--form">
              <FormGroup>
                {/* Champ de modification du nom */}
                <label className="form-control-label">Nom du Module</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Nom du Module"
                  type="text"
                  onChange={e => {
                    currentModule.Nom = e.target.value // à chaque modification du champ de texte, actualise la valeur de currentModule.Nom pour la modification en BDD
                  }
                  }
                  defaultValue={currentModule.Nom}
                />
              </FormGroup>
              {/* Champ de modification du type avec une barre déroulante */}
              <FormGroup>
                <label className="form-control-label">Type de Module</label>
                <Select
                  options={options}
                  onChange={setSelectedOption} // à chaque modification du champ de type, actualise la valeur de selectedOption qui contient l'option choisie pour la modification en BDD
                  name="TypeModule"
                  defaultValue={selectedOption}
                  value={selectedOption}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#8dd7cf',
                      primary: '#c3cfd9'

                    },
                  })}
                />
              </FormGroup>
              <input className="edit-event--id" type="hidden" />
            </Form>
          </div>
          <div className="modal-footer">
            {/* Bouton modifier qui appelle la fonction changeModule pour effectuer la modification */}
            <Button color="primary" onClick={changeModule} >
              Modifier
            </Button>
            {/* Bouton modifier qui appelle la fonction deleteModuleSweetAlert pour effectuer la suppression */}
            <Button
              color="danger"
              onClick={deleteModuleSweetAlert}
            > 
              Supprimer
            </Button> 
            {/* Bouton qui ferme la Pop-up */}
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalChange(false)}
            >
              Close
            </Button>
          </div>

      </Modal>

      {/* Pop-up d'ajout de module. Est affichée lorsque modalAdd = true (lorsque le bouton Ajouter est cliqué) */}
      <Modal
        isOpen={modalAdd}
        toggle={() => setModalAdd(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            {/* Formulaire d'ajout */}
            <Form className="edit-event--form">
              {/* Champ du nom */}
              <FormGroup>
                <label className="form-control-label">Nom du Module</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Nom du Module"
                  type="text"
                  onChange={e => {
                    newModule.Nom = e.target.value // à chaque modification du champ de texte, actualise la valeur de newModule.Nom pour l'ajout en BDD
                  }
                  }
                />
              </FormGroup>
              {/* Champ du type avec une barre déroulante */}
              <FormGroup>
                <label className="form-control-label">Type de Module</label>
                <Select
                  options={options}
                  onChange={setSelectedOption} // à chaque modification du champ de type,  actualise la valeur de selectedOption qui contient l'option choisie pour l'ajout en BDD
                  name="TypeModule"
                  defaultValue={selectedOption}
                  value={selectedOption}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#8dd7cf',
                      primary: '#c3cfd9'

                    },
                  })}
                />
              </FormGroup>
              <input className="edit-event--id" type="hidden" />
            </Form>
          </div>
          <div className="modal-footer">
            {/* Bouton ajouter qui appelle la fonction addModule pour effectuer l'ajout */}
            <Button color="primary" onClick={addModule} >
              Ajouter 
            </Button>
            {/* Bouton qui ferme la Pop-up */}
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalAdd(false)}
            >
              Close
            </Button>
          </div>

      </Modal>

      {/* Pop-up du graphique d'évolution */}
      <Modal
        isOpen={modalChart}
        toggle={() => setModalChart(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
          {/* Graphique d'évolution */}
          <LineChart
            width={400} // Largeur du Graphique d'évolution
            height={300} // Hauteur du Graphique d'évolution 
            data={dataChart.filter(data => data.id.id == currentChart)} // Utilise seulement les valeurs de l'historique correspondant au module souhaité
            margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="value" stroke="#8884d8" dot={true} /> {/* Type de ligne utilisée, clé utilisé pour les valeurs de l'axe Y (value) et option pour afficher des points sur le graphique */}
            <XAxis dataKey="datetime" /> {/* Axe X, clé utilisé pour les valeurs de l'axe X (datetime) */}
            <YAxis /> {/* Axe Y */}
          </LineChart> 
            {/* Bouton qui ferme la Pop-up */}
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalChart(false)}
            >
              Close
            </Button>
        </div>
      </Modal>
    </>
  )
};

export default Modules;