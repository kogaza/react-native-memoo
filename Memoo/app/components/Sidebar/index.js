import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
var styles = require('./styles');

export default class Sidebar extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 40 }}
          source={require('../../images/memoo-logo.png')}
        />
      </View>
    );
  }
}
