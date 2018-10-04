import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import ShowImage from '../ShowImage';
import Options from '../Options';
import Sidebar from "../Sidebar";
import { LinearGradient } from 'expo';


var styles = require('./styles');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      window: 'start',
      newGame: false,
      elements: [],
      numberOfFields: 12,
      numbersToMix: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
      time: 0,
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
      ],
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  mixNumbers = () => {
    let numbers = this.state.numbersToMix;
    let position;
    let el;
    for (let i = 0; i < numbers.length; i++) {
      position = Math.floor((Math.random() * numbers.length));
      el = numbers.slice(position, position + 1)[0];
      numbers.splice(position, 1);
      numbers.push(el);
    }
    this.setState({
      numbersToMix: numbers
    })
  }

  initializeGame = () => {
    this.mixNumbers();
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
      'You want to end this game',
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
    (show == 'start') ? this.initializeGame() : null;
    this.setState({
      show
    })
  }

  showOptionsPress = (arg) => {
    Alert.alert(
      'You want to end this game',
      `Are you sure?`,
      [
        { text: 'Yes', onPress: () => this.showOptions(arg) },
        { text: 'No', onPress: () => console.log() },
      ],
      { cancelable: false }
    )
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

  backToStart = () => {
    (this.state.show == 'game') ?
      Alert.alert(
        'You want to end this game',
        `Are you sure?`,
        [
          { text: 'Yes', onPress: () => this.showContent('start') },
          { text: 'No', onPress: () => console.log() },
        ],
        { cancelable: false }

      )
      :
      this.showContent('start')
  }

  showContent = (content) => {
    (content == 'game') ? this.initializeGame() : null;
    (content == 'options' || content == 'game') ?
      this.setState({
        window: content,
        show: content
      })
      :
      this.setState({
        window: content
      })
  }

  render() {
    let widthEl = 0;
    let heightEl = 0;
    const {
      numberOfClicks,
      imagesType,
      newGame,
      show,
      numberOfFields,
      numbersToMix
    } = this.state;
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
          numbersToMix={numbersToMix}
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
        <LinearGradient
          colors={['transparent','#1d8ed1']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 100,
          }}
        />
        <View style={styles.showOptions}>
          <Button
            title="Show options"
            onPress={() => this.showOptionsPress('options')}
            color="#1d8ed1"
            width={200}
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
      <LinearGradient
          colors={['transparent','#1d8ed1']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 100,
          }}
        />
        <View style={styles.showOptions}>
          <Button
            title="Save"
            onPress={() => this.showContent('start')}
            color="#1d8ed1"
            width={200}
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
    const start =
      <View style={styles.startContainer}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            flex: 1
          }}
          source={require('../../images/stars.png')} />
        <Image
          style={{
            resizeMode: 'contain',
            flex: 1,
            transform: [{ scale: 0.7 }]
          }}
          source={require('../../images/memoo-logo.png')} />
        <TouchableOpacity
          style={styles.splashContainer}
          onPress={() => this.showContent('game')}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={require('../../images/splashT1.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.splashContainer}
          onPress={() => this.showContent('options')}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={require('../../images/splashT2.png')} />
        </TouchableOpacity>
        <Image
          source={require('../../images/stars.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
            flex: 1,
            transform: [{ rotate: '180deg' }]
          }} />
      </View>
    const home =
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Sidebar
            backToStart={(content) => this.backToStart(content)}
          />
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

    return (
      <ImageBackground
        style={styles.background}
        source={require('../../images/background.jpg')} >
        <View style={{ flex: 1 }}>
          {
            (this.state.window == 'start') ? start : home
          }
        </View>
      </ImageBackground>
    );
  }
}
