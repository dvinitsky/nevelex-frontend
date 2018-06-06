import React, { Component } from 'react';
//import './App.css';

export class AnimalDetails extends Component {
 
  render() {
    console.log('inside render for ' + this.props.commonName);
    return (
      <div className="Animal">
        <h1>{this.props.commonName}</h1>
        <p>Scientific Name: {this.props.scientificName ? this.props.scientificName : 'N/A'}</p>
        <p>Family: {this.props.family ? this.props.family : 'N/A'}</p>
        {this.props.imageURL ?
          <img src={this.props.imageURL} alt={this.props.commonName} /> : null
        }
      </div>
    );
  }
}

