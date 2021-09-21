import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // The spread operator allows for future key-value changes within state
  onChangeType = ({ target: { value } }) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        type: value
      }
    })
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map(p => {
      return p.id === id ? { ...p, isAdopted: true } : p;
    })
    this.setState({ pets: pets })
  }

  fetchPets = () => {
    let endpoint = '/api/pets'

    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`
    }
    
    fetch(endpoint)
      .then(res => res.json())
      .then(data => this.setState({ pets: data }));
  }

  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
