import React, { Component } from "react";
import "./App.css";
import { AnimalList } from "./Components/AnimalList";
import { APIHandler } from "./APIHandler";
import { AnimalDetails } from "./Components/AnimalDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.getAnimalList = this.getAnimalList.bind(this);
    this.animalSelect = this.animalSelect.bind(this);
    this.pikachuCheck = this.pikachuCheck.bind(this);
    this.addAnimal = this.addAnimal.bind(this);
    this.deleteAnimal = this.deleteAnimal.bind(this);
    this.hideAnimalDetails = this.hideAnimalDetails.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);

    this.state = {
      animals: [],
      animalDetails: {}
    };
  }

  //since the pikachu imageURL is broken, provide a suitable one before rendering
  pikachuCheck(animal) {
    if (
      animal.imageURL ===
      "http://cartoonbros.com/wp-content/uploads/2016/08/pikachu-13.png"
    ) {
      animal.imageURL =
        "https://pre00.deviantart.net/e6df/th/pre/f/2014/081/5/6/free_pikachu_pokemon_vector_by_emerald_stock-d7b8wpz.png";
    }
    return animal;
  }

  async getAnimalList() {
    let animals = await APIHandler.getList();

    animals.forEach(animal => {
      return this.pikachuCheck(animal);
    });

    this.setState({
      animals: animals
    });
  }

  async animalSelect(animalId) {
    let animalDetails = await APIHandler.getAnimalDetails(animalId);
    animalDetails = this.pikachuCheck(animalDetails);

    this.setState({
      animalDetails: animalDetails
    });
    document.getElementById("animalDetailContainer").style.display = "inline-block";
    document.getElementById("allAnimals").style.width = '50%';
  }

  async hideAnimalDetails() {
    document.getElementById("animalDetailContainer").style.display = "none";
    document.getElementById("allAnimals").style.width = '100%';
  }

  async addAnimal() {
    let input = document.getElementsByClassName("input");

    let animal = {
      commonName: input[0].value,
      scientificName: input[1].value,
      family: input[2].value,
      imageURL: input[3].value
    };

    //Make sure Common Name is present
    if (animal.commonName.trim() === '') {
      alert("Common Name is a required field.");
      return;
    }

    await APIHandler.addAnimal(animal);

    //clear out input fields
    document.getElementsByClassName("input")[0].value = "";
    document.getElementsByClassName("input")[1].value = "";
    document.getElementsByClassName("input")[2].value = "";
    document.getElementsByClassName("input")[3].value = "";

    this.getAnimalList();
  }

  keyPressHandler(e) {
    if (e.which === 13) {
      this.addAnimal();
    }
  }

  async deleteAnimal(id) {
    await APIHandler.deleteAnimal(id);
    this.hideAnimalDetails();
    this.getAnimalList();
  }

  componentDidMount() {
    this.getAnimalList();
  }

  render() {
    return (
      <div className="App" >


        <main>
          <div id="allAnimals" className="container" >
            <h3 className="header"> Click on an animal to see more details! </h3>
            <AnimalList animals={this.state.animals} onClick={this.animalSelect} />
          </div >

          <div id="animalDetailContainer" className="container" >
            <AnimalDetails animalDetails={this.state.animalDetails} delete={this.deleteAnimal} hide={this.hideAnimalDetails} />
          </div >
        </main>


        <div className="addAnimalContainer container" >

          <h3 className="header">Add your own animal!</h3>

          <div className="inputsWrapper">
            <div className="inputContainer">
              <p>Common Name <strong>(required)</strong></p>
              <input onKeyPress={this.keyPressHandler} className="input" type="text" />
            </div>

            <div className="inputContainer">
              <p> Scientific Name </p>
              <input onKeyPress={this.keyPressHandler} className="input" type="text" />
            </div>

            <div className="inputContainer">
              <p > Family </p>
              <input onKeyPress={this.keyPressHandler} className="input" type="text" />
            </div>

            <div className="inputContainer">
              <p> Image URL </p>
              <input onKeyPress={this.keyPressHandler} className="input" type="text" />
            </div>
          </div>

          <button onClick={this.addAnimal} > Submit </button>

        </div >

        <footer>Designed by Daniel Vinitsky</footer>

      </div>
    );
  }
}
export default App;