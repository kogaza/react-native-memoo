import React from 'react';
import Home from './app/components/Home';
import Options from './app/components/Home';
import Sidebar from './app/components/Sidebar';
import { createDrawerNavigator } from 'react-navigation';

class App extends React.Component {
  render() {
    return (
      <AppStack />
    )
  }
}

const AppStack = createDrawerNavigator({
  home: { screen: Home },
  options: { screen: Options },
},
  {
    contentComponent: Sidebar
  }
)

export default App