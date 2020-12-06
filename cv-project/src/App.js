import React, { Component } from 'react'
import './App.css';
import EducationSection from './components/EducationSection';
import GeneralSection from './components/GeneralSection'
import HeaderSection from './components/HeaderSection';
import ProfessionalSection from './components/ProfessionalSection'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (

      <div id="app-container" className="container-fluid">
        <div className="row">
          <div className="col-3">
          </div>
          <div id="main-content" className="col-6">
            <div className="m-2">
              <HeaderSection />
            </div>
            <div id="cards-section">
              <GeneralSection />
              <EducationSection />
              <ProfessionalSection />
            </div>

          </div>
          <div className="col-3">
          </div>
        </div>


      </div>
    )
  }
}


export default App;
