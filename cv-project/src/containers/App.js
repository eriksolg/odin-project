import React from 'react'
import './App.css';
import EducationSection from '../components/EducationSection/EducationSection';
import GeneralSection from '../components/GeneralSection/GeneralSection'
import HeaderSection from '../components/HeaderSection/HeaderSection';
import ProfessionalSection from '../components/ProfessionalSection/ProfessionalSection'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      firstName: 'Michelangelo',
      lastName: 'Crisostomus',
      profession: 'IT-specialist',
      address: 'My Address 25, Jõhvi, Estonia',
      phone: '+372 12345678',
      birth: '1991-11-11',
      email: 'my.email@gmail.com',
      educationData: [
        {
          start: '2016-01-01',
          end: '2019-01-01',
          schoolName: 'Miina Härma Gümnaasium',
          degree: 'Keskharidus',
        }
      ],
      professionalData: [
        {
          start: '2017-01-01',
          end: '2019-01-01',
          companyName: 'AS Pets ja Pojad',
          profession: 'AD haldur',
          description: 'Tegin seda ja toda',
        }
      ],
      educationFormOpen: false,
      professionalFormOpen: false
    }
  }

  render() {
    return (

      <div id="app-container" className="container-fluid">
        <div className="row">
          <div className="col-xl-2">
          </div>
          <div id="main-content" className="col-xl-8 col-12">
            <div className="m-2">
              <HeaderSection
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                profession={this.state.profession}
                setState={this.setState.bind(this)} />
            </div>
            <div id="cards-section">
              <GeneralSection
                address={this.state.address}
                phone={this.state.phone}
                birth={this.state.birth}
                email={this.state.email}
                setState={this.setState.bind(this)} />
              <EducationSection
                educationData={this.state.educationData}
                educationFormOpen={this.state.educationFormOpen}
                setState={this.setState.bind(this)} />
              <ProfessionalSection
                professionalData={this.state.professionalData}
                professionalFormOpen={this.state.professionalFormOpen}
                setState={this.setState.bind(this)} />
            </div>

          </div>
          <div className="col-xl-2">
          </div>
        </div>


      </div>
    )
  }
}


export default App;
