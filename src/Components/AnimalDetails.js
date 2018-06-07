import React, { Component } from "react";
//import './App.css';

export class AnimalDetails extends Component {
  constructor(props) {
    super(props);
    this.deleteAnimal = this.deleteAnimal.bind(this);
    this.hide = this.hide.bind(this);
  }

  deleteAnimal() {
    if (this.props.animalDetails.id === '1' || this.props.animalDetails.id === '2' || this.props.animalDetails.id === '3') {
      alert('This animal canont be deleted.');
      return;
    }
    this.props.delete(this.props.animalDetails.id);
  }

  hide() {
    this.props.hide();
  }

  render() {
    return (
      <div className="Animal">
        <p className="hide" onClick={this.hide}>(Hide)</p>
        <h1>{this.props.animalDetails.commonName}</h1>
        <p>
          Scientific Name:{" "}
          {this.props.animalDetails.scientificName
            ? this.props.animalDetails.scientificName
            : "N/A"}
        </p>
        <p>
          Family:{" "}
          {this.props.animalDetails.family
            ? this.props.animalDetails.family
            : "N/A"}
        </p>

        {this.props.animalDetails.imageURL ? (
          <img
            src={this.props.animalDetails.imageURL}
            alt={this.props.animalDetails.commonName}
          />
        ) : null}

        <p />
        <button onClick={this.deleteAnimal}>Delete</button>
      </div>
    );
  }
}
