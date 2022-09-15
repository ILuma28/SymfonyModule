import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactBSAlert from "react-bootstrap-sweetalert";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Modal,
  Row,
  Col
} from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCircle);

const Modules = () => { 

  const [modules, setModules] = useState([]);
  const [alert, setAlert] = useState();
  const [modalChange, setModalChange] = useState(false);
  const [modalChart, setModalChart] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  let [currentModule, setCurrentModule] = useState({
    id: undefined,
    Nom: undefined,
    Type: undefined,
  });
  let [newModule, setNewModule] = useState({
    id: undefined,
    Nom: undefined,
    Type: undefined,
  });
  let [options, setOptions] = useState([
    {value: "Thermique", label: "Thermique"},
    {value: "Vitesse", label: "Vitesse"}
  ])
  const [selectedOption, setSelectedOption] = useState(null)
  let [dataChart, setDataChart] = useState();

  useEffect(() => {
    fetchModules(),
    fetchHistorique()
  }, [])

  const fetchModules = async () => {
  
    try {
      await axios
        .get("http://localhost:8000/api/modules")
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

  const fetchHistorique = async () => {

    try {
      await axios
        .get("http://localhost:8000/api/historique_modules")
        .then((response) => {setDataChart(response.data["hydra:member"])} )
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

  const addModule = () => {
    try {
      axios.post("http://localhost:8000/api/modules", {
        Nom: newModule.Nom,
        Type: selectedOption.value,
      })
      setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {setAlert(null), window.location.reload()}}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Module ajouté !
        </ReactBSAlert>
      )
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
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {setAlert(null), window.location.reload()}}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue !
        </ReactBSAlert>
    }
  }
  
  const handleModify = (module) => {
    console.log(dataChart)
    currentModule.id = module.id
    currentModule.Nom = module.nom
    setSelectedOption({label:module.type, value: module.type})
    setModalChange(true)
  }

  const changeModule = () => {
    console.log(selectedOption.value)
    const headers = { 'Content-Type': 'application/merge-patch+json' }
    try {
      axios.patch("http://localhost:8000/api/modules/" + currentModule.id, {
        Nom: currentModule.Nom,
        Type: selectedOption.value,
      }, 
      {headers} )
      setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {setAlert(null), window.location.reload()}}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Module modifié !
        </ReactBSAlert>
      )
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
      setAlert(
        <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {setAlert(null), window.location.reload()}}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue !
        </ReactBSAlert>
      )
    }
  }

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

  const deleteModule = () => {
  
    try {
      axios.delete("http://localhost:8000/api/modules/" + currentModule.id)
      setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => {setAlert(null), window.location.reload()}}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Module supprimé !
        </ReactBSAlert>
      )
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
      <ReactBSAlert
          danger
          style={{ display: "block" }}
          title="Error"
          onConfirm={() => {setAlert(null), window.location.reload()}}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Une erreur est survenue !
        </ReactBSAlert>
    }
    setModalChange(false),
    currentModule.id = undefined
    currentModule.Type = undefined
    setSelectedOption(null);
  }

  return (
    <>
      {alert}
      <div className="ModuleArray">
        <table id="modulesTable" className="table table-dark">
          <thead>
            <tr>
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
            {modules.map(module => (
              <tr key={module.id + "00"}>
                <td key={module.id + "0"}>{module.id}</td>
                {module.EtatMarche == true &&
                  <td key={module.id + "1"}><FontAwesomeIcon icon={faCircle} style={{color: "green"}}/></td>
                }
                {module.EtatMarche == false &&
                  <td key={module.id + "1"}><FontAwesomeIcon icon={faCircle} style={{color: "red"}}/></td>
                }
                <td key={module.id + "2"}>{module.Nom}</td>
                <td key={module.id + "3"}>{module.Type}</td>
                <td key={module.id + "4"}>{module.ValeurActuelle}{module.Type == "Thermique" && "°C"}{module.Type == "Vitesse" && "km/h"}</td>
                <td key={module.id + "5"}>
                  {Math.floor(module.DureeFonctionnement / 3600).toString().padStart(2, '0') + ':' +
                  Math.floor((module.DureeFonctionnement - (Math.floor(module.DureeFonctionnement / 3600) * 3600)) / 60).toString().padStart(2, '0') + ':' +
                  Math.floor(module.DureeFonctionnement - (Math.floor(module.DureeFonctionnement / 3600) * 3600) - (Math.floor((module.DureeFonctionnement - (Math.floor(module.DureeFonctionnement / 3600) * 3600)) / 60) * 60)).toString().padStart(2, '0')
                }
                </td>
                <td key={module.id + "6"}>{module.NombreDonneesEnvoyees}</td>
                <td key={module.id + "7"}><Button color="success" onClick={() => handleModify(module)}>Modifier / Supprimer</Button></td> 
                <td key={module.id + "8"}><Button color="success" onClick={() => setModalChart(true)}>Voir l'évolution</Button></td> 
              </tr>))}
          </tbody>
        </table>
      </div>
      <div>
        <Button className="centre" color="success" onClick={() => setModalAdd(true)}>Ajouter</Button>
      </div>
      <Modal
        isOpen={modalChange}
        toggle={() => setModalChange(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            <Form className="edit-event--form">
              <FormGroup>
                <label className="form-control-label">Nom du Module</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Nom du Module"
                  type="text"
                  onChange={e => {
                    currentModule.Nom = e.target.value
                  }
                  }
                  defaultValue={currentModule.Nom}
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Type de Module</label>
                <Select
                  options={options}
                  onChange={setSelectedOption}
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
            <Button color="primary" onClick={changeModule} >
              Modifier
            </Button>
            <Button
              color="danger"
              onClick={deleteModuleSweetAlert}
            > 
              Supprimer
            </Button> 
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalChange(false)}
            >
              Close
            </Button>
          </div>

      </Modal>
      <Modal
        isOpen={modalAdd}
        toggle={() => setModalAdd(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
            <Form className="edit-event--form">
              <FormGroup>
                <label className="form-control-label">Nom du Module</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Nom du Module"
                  type="text"
                  onChange={e => {
                    newModule.Nom = e.target.value
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Type de Module</label>
                <Select
                  options={options}
                  onChange={setSelectedOption}
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
            <Button color="primary" onClick={addModule} >
              Ajouter 
            </Button>
            <Button
              className="ml-auto"
              color="link"
              onClick={() => setModalAdd(false)}
            >
              Close
            </Button>
          </div>

      </Modal>

      <Modal
        isOpen={modalChart}
        toggle={() => setModalChart(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">

        </div>
      </Modal>
    </>
  )
};

export default Modules;