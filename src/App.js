import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Header from './components/Header'
import UploadPrompt from './components/UploadPrompt'
import SettingsPane from './components/SettingsPane'
import './App.css';
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="container grid-lg">
          <Header />
          <div className="columns">
            <UploadPrompt />
            <SettingsPane />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
