import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  Button,
} from "react-native";
import ShowImage from '../ShowImage';
import Options from '../Options';
import Sidebar from "../Sidebar";

var styles = require('./styles');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newGame: false,
      elements: [],
      numberOfFields: 12,
      levels: [
        {
          id: 0,
          name: 'EASY',
          numberOfFields: 8
        },
        {
          id: 1,
          name: 'MEDIUM',
          numberOfFields: 12
        },
        {
          id: 2,
          name: 'HARD',
          numberOfFields: 24
        }
      ],
      numberOfClicks: 0,
      attempts: 0,
      imagesType: 'fruits',
      show: 'game',
      icons: [
        {
          id: 0,
          name: 'fruits',
          img: require('../../images/icons/fruits.png')
        },
        {
          id: 1,
          name: 'colors',
          img: require('../../images/icons/colors.png')
        },
        {
          id: 2,
          name: 'marks',
          img: require('../../images/icons/marks.png')
        },
      ]
    }
  }
  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    const { numberOfFields } = this.state;
    let elements = [];
    let numbers = [];
    let imageId;
    let element = {};
    let i = 0;
    while (i <= numberOfFields - 1) {
      randomNumber = Math.floor((Math.random() * (numberOfFields / 2)) + 1);
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
    });
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

  hideElements = () => {
    const { numberOfClicks, elements, attempts } = this.state;
    if (numberOfClicks >= 2) {
      setTimeout(() => {
        let newElements = elements.map(x => {
          return {
            ...x,
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
    elements[id].clicked = true;
    this.setState({
      elements,
      numberOfClicks: numberOfClicks + 1
    }, () => this.hideElements())
  }

  showOptions = (arg) => {
    let show = arg;
    (show == 'game') ? this.initializeGame() : null;
    this.setState({
      show
    })
  }

  changeImages = (icon) => {
    let imagesType = icon;
    this.setState({
      imagesType
    })
  }
  changeLevel = (level) => {
    let numberOfFields = level;
    this.setState({
      numberOfFields
    })
  }

  render() {
    let widthEl = 0;
    let heightEl = 0;
    const { numberOfClicks, imagesType, newGame, show, numberOfFields } = this.state;
    switch (numberOfFields) {
      case 8:
        widthEl = 120;
        heightEl = 80;
        break;
      case 12:
        widthEl = 100;
        heightEl = 80;
        break;
      case 24:
        widthEl = 75;
        heightEl = 55;
        break;
      default:
        break;
    }

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
    const mainField = (show == 'game') ?
      <View style={styles.board}>
        {allElements}
      </View>
      :
      <Options
        changeImages={(icon) => this.changeImages(icon)}
        changeLevel={(level) => this.changeLevel(level)}
        icons={this.state.icons}
        imagesType={this.state.imagesType}
        numberOfFields={this.state.numberOfFields}
        levels={this.state.levels}
      />

    const header = (show == 'game') ?
      <View style={styles.headersElements}>
        <View style={styles.showOptions}>
          <Button
            title="Show options"
            onPress={() => this.showOptions('options')}
            color="#1d8ed1"
          ></Button>
        </View>
        <View style={styles.attemptsContainer}>
          <Text style={styles.attempts}>
            Attempts: {this.state.attempts}
          </Text>
        </View>
      </View>
      :
      <View style={styles.headersElements}>
        <View style={styles.showOptions}>
          <Button
            title="Back to game"
            onPress={() => this.showOptions('game')}
            color="#1d8ed1"
          ></Button>
        </View>
        <View style={styles.attemptsContainer}></View>
      </View>
    const newGameButton = (show == 'game') ?
      <View style={styles.newGameContainer}>
        <Button
          title='New Game'
          onPress={this.onNewGamePress}
          color="#1d8ed1"
        />
      </View>
      :
      <View style={styles.newGameContainer}>
      </View>


    return (
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Sidebar />
        </View>
        <View style={styles.header}>
          {header}
        </View>
        <View style={styles.mainField}>
          {mainField}

        </View>
        <View style={styles.newGame}>
          {newGameButton}
        </View>
      </View>

    );
  }
}
