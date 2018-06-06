import React, { Component } from 'react';
//import './App.css';
import {Animal} from './Animal';

export class AnimalList extends Component {


  render() {
    return (
      <div className="AnimalList">
        {this.props.animals.map(animal => {
          console.log('Now rendering ' + animal.commonName);
          return (
            <Animal key={animal.id} id={animal.id} imageURL={animal.imageURL} commonName={animal.commonName} scientificName={animal.scientificName} family={animal.family}  />
          )
        })}
      </div>
    );
  }
}

export default AnimalList;
