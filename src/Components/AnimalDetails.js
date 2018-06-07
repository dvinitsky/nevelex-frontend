import React, { Component } from "react";
//import './App.css';

export class AnimalDetails extends Component {
  constructor(props) {
    super(props);
    this.deleteAnimal = this.deleteAnimal.bind(this);
  }

  deleteAnimal() {
    this.props.delete(this.props.animalDetails.id);
  }

  render() {
    return (
      <div className="Animal">
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
