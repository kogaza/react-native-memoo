import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from 'react-navigation';
import Images from '../Images'

var styles = require('./styles');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // gameState: [
      //   [0, 0, 0],
      //   [0, 0, 0],
      //   [0, 0, 0]
      // ],
      // currentPlayer: 1,

      elements: [],
      numberOfFields: 12,
      numberOfClicks: 0,
      attempts: 0
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
          backVisible: 1,
          visible: false,
          available: true
        }
        elements.push(element);
      }
    }
    this.setState({
      elements,
      attempts: 0
    });
  }

  //Returns 1 if Player 1 won, -1 if Player 2 won, or a 0 if no one has won.
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    //Check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //Check columns
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //Check the diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    // There are no winners
    return 0;
  }

  onTilePress = (row, col) => {
    //Don't allow tiles to change
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    //Grab current player
    var currentPlayer = this.state.currentPlayer;

    // Set the correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //Switch to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //Check for winners
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert(
        'Player 1 is the winner!',
        'Congratulations!',
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false }
      )
    } else if (winner == -1) {
      Alert.alert(
        'Player 2 is the winner!',
        'Congratulations!',
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false }
      )
    }
  }

  onNewGamePress = () => {
    Alert.alert(
      'You want to end this game?',
      `Are you sure?`,
      [
        { text: 'Yes', onPress: () => this.initializeGame() },
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
            visible: false,
            available: true
          };
        });
        let clickedElements = elements.filter(x => x.visible == true);
        if (clickedElements && clickedElements[0].imageId == clickedElements[1].imageId) {
          newElements[clickedElements[0].id - 1].backVisible = 0;
          newElements[clickedElements[1].id - 1].backVisible = 0;
        }
        if (newElements.filter(x => x.backVisible == 1).length <= 0) {
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
      }, 1000);
    }
  }

  showImage = (id) => {
    // console.log(elements[id]);
    const { elements, numberOfClicks } = this.state;
    if (numberOfClicks < 2 && elements[id].available == true) {
      elements[id].visible = true;
      elements[id].available = false;
      this.setState({
        elements,
        numberOfClicks: numberOfClicks + 1
      }, () => this.hideElements())
    }
  }

  render() {
    const widthEl = 100;
    const heightEl = 80;
    const allElements = this.state.elements.map((el, i) => {
      return (
        <ImageBackground
          key={i}
          source={require('../../images/memoo-logo2.png')}
          resizeMode='contain'
          style={{
            width: widthEl,
            height: heightEl,
            margin: '1%',
            backgroundColor: 'grey',
            borderRadius: 5,
            opacity: el.backVisible
          }}
        >
          <TouchableOpacity
            style={[
              styles.element,
            ]}
            onPress={() => this.showImage(el.id - 1)}
          >
            <Images
              width={widthEl}
              height={heightEl}
              imageId={el.imageId}
              visible={el.visible}
            />
          </TouchableOpacity>
        </ImageBackground>
      )
    })

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