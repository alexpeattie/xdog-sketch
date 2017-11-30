import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Header from './components/Header'
import ImagePane from './components/ImagePane'
import SettingsPane from './components/SettingsPane'
import BrowserWarning from './components/BrowserWarning'
import AboutModal from './components/AboutModal'
import './App.css';
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className='outer-container'>
          <BrowserWarning />

          <div className="container grid-lg">
            <Header />
            <div className="columns">
              <ImagePane />
              <SettingsPane />
            </div>
            <AboutModal /> 
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
