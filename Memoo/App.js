import React from 'react';
import Home from './app/components/Home';
import Options from './app/components/Options';
import Sidebar from './app/components/Sidebar';
import { createDrawerNavigator } from 'react-navigation';

class App extends React.Component {
  render() {
    return (
      <Home />
    )
  }
}

export default App