import React, { Component } from 'react';
import './App.css';
import {AnimalList} from './Components/AnimalList';
import {APIHandler} from './APIHandler';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props);
    this.getAnimalList = this.getAnimalList.bind(this);

    this.state = {
      animals: []
    }
  }


  async getAnimalList() {
    let animals = await APIHandler.getList();
    this.setState({animals: animals});
    console.log(this.state.animals);
  }

  componentDidMount(){
    this.getAnimalList();
  }

  /*
  render() {
    return (
      <div className="App">

        <div className="allAnimals container">
          <h1>All Animals</h1>
          <h3>Click to see more!</h3>
          <AnimalList animals={this.state.animals} />
        </div>

        <div className="centerOr">
          OR
        </div>

        <div className="findAnimal container">
          <h2>Find an animal by name</h2>
          <input />
        </div>
        
      </div>
    );
  }
  */


  //testing router
 render() {
  return (
    <Router>
      <div className="App">

        <div className="allAnimals container">
          <h1>All Animals</h1>
          <Link to="/:id">Click to see more!</Link>
          <AnimalList animals={this.state.animals} />
        </div>

        <div className="centerOr">
          OR
        </div>

        <div className="findAnimal container">
          <h2>Find an animal by name</h2>
          <input />
        </div>
      </div>
    </Router>
  );
}

}

export const AnimalRouter = () => (
  <Router>
    <div>
      <h2>Animals</h2>
      <ul>
        <li>
          <Link to="/netflix">Netflix</Link>
        </li>
        <li>
          <Link to="/zillow-group">Zillow Group</Link>
        </li>
        <li>
          <Link to="/yahoo">Yahoo</Link>
        </li>
        <li>
          <Link to="/modus-create">Modus Create</Link>
        </li>
      </ul>

      <Route path="/:id" component={Child} />

      />
    </div>
  </Router>
);

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);


export default App;
