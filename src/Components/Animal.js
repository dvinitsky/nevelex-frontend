import React, { Component } from "react";
//import './App.css';

export class Animal extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div className="Animal" onClick={this.clickHandler}>
        <p className="animalName">{this.props.commonName}</p>

        {this.props.imageURL ? (
          <img src={this.props.imageURL} alt={this.props.commonName} />
        ) : null}
      </div>
    );
  }
}
