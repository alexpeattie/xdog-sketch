import React, { Component } from 'react'
import { Provider } from 'react-redux'
import UploadPrompt from './components/UploadPrompt'
import './App.css';
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <UploadPrompt />
      </Provider>
    );
  }
}

export default App;
