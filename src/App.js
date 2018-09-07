import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
const API_KEY = `${process.env.REACT_APP_API_KEY_CLARIFAI}`;

class App extends Component {
  state = {
    input: ''
  };

  handleInputChange = e => {
    console.log(e.target.value);
  };
  handleButtonSubmit = () => {
    console.log('click');
  };
  render() {
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.handleInputChange}
          onButtonSubmit={this.handleButtonSubmit}
        />
      </div>
    );
  }
}

export default App;
