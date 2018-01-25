import React, { Component } from 'react';
import './css/App.css';
import Callback from './Callback';
import { BrowserRouter, Route } from 'react-router-dom';
import MenuPanel from './MenuPanel';
import VoiceRecognition from '../VoiceComponents/VoiceRecognition';

import { login, isLoggedIn} from '../../utils/AuthService';

class App extends Component {
    
  componentDidMount(){
    if(!isLoggedIn()){
        login();
    }
  }
  
  render() {
    return (
      <div className="App">
        <MenuPanel />
        <header className="App-header">
            <h1 className="App-title">Welcome Home</h1>
            <img src="hud.gif" className="App-logo" alt="logo" />
        </header>
	<VoiceRecognition />
        <BrowserRouter>
            <div>
                <Route path="/callback" component={Callback} />
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
