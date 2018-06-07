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

    //alphabetize animal list
    let newList = [animals[0]];

    for (let a = 1; a < animals.length; a++) {
      //for each animals on the list, check against each newList item
      for (let i = 0; i < newList.length; i++) {
        //if we've reached the end of newList, tack the current animal on to the end
        if (i === newList.length) {
          newList.push(animals[a]);
          break;
        }
        //otherwise, keep checking until we find a newList animal that's later in the alphabet than the current animal
        else if (
          newList[i].commonName.toLowerCase() >
          animals[a].commonName.toLowerCase()
        ) {
          //add our current animal in before that newList animal
          newList.splice(i, 0, animals[a]);
          break;
        }
      }
    }

    this.setState({ animals: newList });
  }

  async animalSelect(animalId) {
    let animalDetails = await APIHandler.getAnimalDetails(animalId);
    animalDetails = this.pikachuCheck(animalDetails);

    this.setState({ animalDetails: animalDetails });
    document.getElementById("animalDetailContainer").style.display = "block";
  }

  async addAnimal() {
    let input = document.getElementsByClassName("input");

    let animal = {
      commonName: input[0].value,
      scientificName: input[1].value,
      family: input[2].value,
      imageURL: input[3].value
    };

    await APIHandler.addAnimal(animal);

    //clear out input fields
    document.getElementsByClassName("input")[0].value = "";
    document.getElementsByClassName("input")[1].value = "";
    document.getElementsByClassName("input")[2].value = "";
    document.getElementsByClassName("input")[3].value = "";

    this.getAnimalList();
  }

  async deleteAnimal(id) {
    await APIHandler.deleteAnimal(id);
    document.getElementById("animalDetailContainer").style.display = "none";
    this.getAnimalList();
  }

  componentDidMount() {
    this.getAnimalList();
  }

  render() {
    return (
      <div className="App">
        <div className="allAnimals container">
          <h1>All Animals</h1>
          <h3>Click on an animal to see more details!</h3>
          <AnimalList
            animals={this.state.animals}
            onClick={this.animalSelect}
          />
        </div>

        <div id="animalDetailContainer" className="container">
          <AnimalDetails
            animalDetails={this.state.animalDetails}
            delete={this.deleteAnimal}
          />
        </div>

        <div className="addAnimalContainer container">
          <p>Common Name (required)</p>
          <input className="input" type="text" />
          <p>Scientific Name</p>
          <input className="input" type="text" />
          <p>Family</p>
          <input className="input" type="text" />
          <p>Image URL</p>
          <input className="input" type="text" />
          <p />
          <button onClick={this.addAnimal}>Submit</button>
        </div>
      </div>
    );
  }
}
export default App;
