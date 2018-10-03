import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
var styles = require('./styles');

export default class Options extends Component {
  render() {
    const { icons, imagesType, numberOfFields, levels } = this.props;
    const iconsOption = icons.map(icon => {
      const selected = icon.name == imagesType ?
        {
          borderColor: '#1d8ed1',
          borderWidth: 4,
        }
        :
        null;
      return (
        <TouchableOpacity
          key={icon.id}
          style={selected}
          onPress={() => this.props.changeImages(icon.name)}>
          <Image
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain',
            }}
            source={icon.img} />
        </TouchableOpacity>
      )
    })
    const levelOption = levels.map(level => {
      const selected = level.numberOfFields == numberOfFields ?
      {
        borderColor: '#1d8ed1',
        borderWidth: 4,
        backgroundColor: '#54a3c4',
      }
      :
      null;
      const selectedColor = level.numberOfFields == numberOfFields ?
      {
        color: 'white'
      }
      :
      null;
      return (
        <TouchableOpacity
          key={level.id}
          style={[styles.level, selected]}
          onPress={() => this.props.changeLevel(level.numberOfFields)}
        >
          <Text style={[styles.levelText, selectedColor]}>
            {level.name}
          </Text>

        </TouchableOpacity>
      )
    })
    return (
      <View style={styles.container}>
        <View style={styles.choicePictures}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              What pictures you want to play?
          </Text>
          </View>
          <View style={styles.icons}>
            {iconsOption}
          </View>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: "#1d8ed1"}}></View>
        <View style={styles.choiceLevel}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              Select the level
          </Text>
          </View>
          <View style={styles.levelContainer}>
            {levelOption}
          </View>
        </View>
      </View>
    );
  }
}