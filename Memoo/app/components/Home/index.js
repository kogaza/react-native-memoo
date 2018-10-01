import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  ImageBackground,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from 'react-navigation';
import ShowImage from '../ShowImage';
import CardFlip from 'react-native-card-flip';


var styles = require('./styles');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newGame: false,
      elements: [],
      numberOfFields: 12,
      numberOfClicks: 0,
      attempts: 0,
      imagesType: 'fruits'
    }
  }
  componentDidMount() {
    this.initializeGame();
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Image
        style={{
          width: 100,
          height: 40,
        }}
        source={require('../../images/memoo-logo.png')} />
    ),
    title: 'Hello!',
  })

  initializeGame = () => {
    const { numberOfFields } = this.state;
    let elements = [];
    let numbers = [];
    let imageId;
    let element = {};
    let i = 0;
    while (i <= 11) {
      randomNumber = Math.floor((Math.random() * 6) + 1);
      if (numbers.filter(nr => nr == randomNumber).length < 2) {
        numbers.push(randomNumber);
        imageId = numbers[i++];
        element = {
          id: i,
          imageId,
          visible: true,
          clicked: false
        }
        elements.push(element);
      }
    }
    this.setState({
      elements,
      numberOfClicks: 0,
      newGame: false,
      attempts: 0,
    }, () => console.log(this.state));
  }

  resetGame = () => {
    this.setState({
      newGame: true,
    });
    setTimeout(
      () => this.initializeGame()
      , 100)
  }

  onNewGamePress = () => {
    Alert.alert(
      'You want to end this game?',
      `Are you sure?`,
      [
        { text: 'Yes', onPress: () => this.resetGame() },
        { text: 'No', onPress: () => console.log() },
      ],
      { cancelable: false }
    )
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Icon name="times" style={[styles.tileIcon, styles.tileX]} />;
      case -1: return <Icon name="circle" style={[styles.tileIcon, styles.tileO]} />;
      default: return <View />
    }
  }

  hideElements = () => {
    const { numberOfClicks, elements, attempts } = this.state;
    if (numberOfClicks >= 2) {
      setTimeout(() => {
        let newElements = elements.map(x => {
          return {
            ...x,
            // visible: true,
            clicked: false
          };
        });
        let clickedElements = elements.filter(x => x.clicked == true);
        if (clickedElements && clickedElements[0].imageId == clickedElements[1].imageId) {
          newElements[clickedElements[0].id - 1].visible = false;
          newElements[clickedElements[1].id - 1].visible = false;
        }
        if (newElements.filter(x => x.visible == true).length <= 0) {
          Alert.alert(
            'You are the winner!',
            `Your result is ${this.state.attempts + 1} attempts`,
            [
              { text: 'OK', onPress: () => this.initializeGame() },
            ],
            { cancelable: false }
          )
        };
        this.setState({
          elements: newElements,
          numberOfClicks: 0,
          attempts: attempts + 1
        })
      }, 1500);
    }
  }

  showImage = (id) => {
    const { elements, numberOfClicks } = this.state;
    // if (numberOfClicks < 2 && elements[id].available == true) {
    //   elements[id].visible = true;
    elements[id].clicked = true;
    this.setState({
      elements,
      numberOfClicks: numberOfClicks + 1
      // }, () => console.log(this.state))
    }, () => this.hideElements())
    // }
  }


  render() {
    const widthEl = 100;
    const heightEl = 80;
    const { numberOfClicks, imagesType, newGame } = this.state;

    const allElements = this.state.elements.map((el, i) => {
      return (
        <ShowImage
          key={i}
          el={el}
          i={i}
          width={widthEl}
          height={heightEl}
          imageId={el.imageId}
          visible={el.visible}
          clicked={el.clicked}
          numberOfClicks={numberOfClicks}
          imagesType={imagesType}
          newGame={newGame}
          showImage={(id) => this.showImage(id)}
        />
      )
    })
    this.allElements = allElements;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.changeIcons}>
            <Button title="Change icons" onPress={() => this.props.navigation.navigate('options')}></Button>
          </View>
          <View style={styles.attemptsContainer}>
            <Text style={styles.attempts}>
              Attempts: {this.state.attempts}
            </Text>
          </View>
        </View>
        <View style={styles.board}>
          {allElements}

        </View>
        <View style={styles.newGame}>
          <Button title='New Game' onPress={this.onNewGamePress} />
        </View>
      </View>

    );
  }
}

class Options extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Image
        style={{
          width: 100,
          height: 40,
        }}
        source={require('../../images/memoo-logo.png')} />
    ),
    title: 'Options',
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.questionText}>What pictures you want to play?</Text>
        </View>
      </View>
    );
  }
}

export default createStackNavigator({
  home: Home,
  options: Options
});