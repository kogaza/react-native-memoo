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

export default Sidebar