import React, { Component } from 'react';
import { Animal } from './Animal';

export class AnimalList extends Component {

  render() {
    return (
      <div className="animalList"> 
        {this.props.animals.map(animal => {
          return (
            <Animal key={animal.id} id={animal.id} imageURL={animal.imageURL} commonName={animal.commonName} scientificName={animal.scientificName} family={animal.family} onClick={this.props.onClick} />
          )
        })
      }
      </div>
    );
  }
}

export default AnimalList;