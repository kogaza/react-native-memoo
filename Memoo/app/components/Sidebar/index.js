import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

var styles = require('./styles');

class Sidebar extends Component {

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    const routes = [{
      title: 'Home',
      route: 'home'
    },
    {
      title: 'Options',
      route: 'options'
    }]

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 200, height: 80 }}
            source={require('../../images/memoo-logo.png')}
          />
        </View>
        {
          routes.map((e, i) => (
            <TouchableOpacity
              key={i}
              style={styles.link}
              onPress={_ => this.navigate(e.route)}
            >
              <Text style={styles.text}>{e.title}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2c3e50',
//   },
//   link: {
//     padding: 15,
//     borderBottomWidth: 2,
//     borderBottomColor: '#eee',
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     margin: 10,
//   },
//   text: {
//     color: 'red',
//     fontSize: 20,
//   }
// })

export default Sidebar