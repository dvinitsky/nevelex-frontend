import React, { Component } from 'react';
//import './App.css';

export class Animal extends Component {
 
  render() {
    console.log('inside render for ' + this.props.commonName);
    return (
      <div className="Animal">
        <p className="animalName">{this.props.commonName}</p>
        {this.props.imageURL ?
          <img src={this.props.imageURL} alt={this.props.commonName} /> : null
        }
      </div>
    );
  }
}

