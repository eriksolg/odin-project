import React, { Component } from 'react'
import './App.css';
import EducationSection from './components/EducationSection';
import GeneralSection from './components/GeneralSection'
import ProfessionalSection from './components/ProfessionalSection'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <GeneralSection />
        <EducationSection />
        <ProfessionalSection />
      </div>
    )
  }
}


export default App;
