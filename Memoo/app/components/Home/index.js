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
      flag: 'poland',
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
      language: [
        {
          id: 0,
          name: 'britain',
          img: require('../../images/flags/BritainFlag.png')
        },
        {
          id: 1,
          name: 'poland',
          img: require('../../images/flags/PolandFlag.png')
        },
        {
          id: 2,
          name: 'croatia',
          img: require('../../images/flags/CroatiaFlag.png')
        },
      ],
      texts: [],
      optionsButton: '',
      newgameButton: '',
      saveButton: '',
      textIndex: 0,
      startTexts: [
        {
          id: 1,
          newGame: require('../../images/nowaGra.png'),
          settings: require('../../images/opcjeGry.png')
        },
        {
          id: 2,
          newGame: require('../../images/newGame.png'),
          settings: require('../../images/settings.png')
        },
        {
          id: 3,
          newGame: require('../../images/novaIgra.png'),
          settings: require('../../images/opcijeIgre.png')
        }
      ],
    }
  }

  componentDidMount() {
    this.initializeGame();
    this.translate();
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
    const { texts } = this.state;
    Alert.alert(
      texts[10],
      texts[11],
      [
        { text: texts[14], onPress: () => this.resetGame() },
        { text: texts[15], onPress: () => console.log() },
      ],
      { cancelable: false }
    )
  }

  hideElements = () => {
    const { numberOfClicks, elements, attempts, texts } = this.state;
    if (numberOfClicks >= 2) {
      let clickedElements = elements.filter(x => x.clicked == true);
      let newElements = elements.map(x => {
        return {
          ...x,
          clicked: false
        };
      });
      if (clickedElements &&
        clickedElements[0].imageId == clickedElements[1].imageId) {
        setTimeout(() => {
          newElements[clickedElements[0].id - 1].visible = false;
          newElements[clickedElements[1].id - 1].visible = false;
          if (newElements.filter(x => x.visible == true).length <= 0) {
            Alert.alert(
              texts[12],
              `${texts[13]} ${this.state.attempts + 1}`,
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
        }, 500);
      }
      else {
        setTimeout(() => {
          if (newElements.filter(x => x.visible == true).length <= 0) {
            Alert.alert(
              texts[12],
              `${texts[13]} ${this.state.attempts + 1}`,
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
    const { texts } = this.state;
    Alert.alert(
      texts[10],
      texts[11],
      [
        { text: texts[14], onPress: () => this.showOptions(arg) },
        { text: texts[15], onPress: () => console.log() },
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
  translate = () => {
    const pol = [
      'Wybierz obrazki',
      'Poziom trudności',
      'Język',
      'Pokaż opcje',
      'Liczba prób',
      'Nowa gra', // 5
      'Zapisz',
      'Łatwy',
      'Średni',
      'Trudny',
      'Chcesz zakończyć grę!', // 10
      'Jesteś tego pewien?',
      'Jesteś zwycięzcą!',
      'Twój wynik to: ',
      'Tak',
      'Nie', // 15

    ];
    const ang = [
      'Choose pictures',
      'Difficulty level',
      'Language',
      'Show options',
      'Attempts',
      'New game', // 5
      'Save',
      'Easy',
      'Medium',
      'Hard',
      'You want to end this game!', // 10
      'Are you sure?',
      'You are the winner!',
      'Your result is: ',
      'Yes',
      'No', // 15

    ];
    const cro = [
      'Odaberite slike',
      'Razina težine',
      'Jezik',
      'Prikaz opcija',
      'Broj pokušaja',
      'Nova igra', // 5
      'Spremi',
      'Lako',
      'Srednja',
      'Teška',
      'Želite okončati igru', // 10
      'Jeste li sigurni u to?',
      'Vi ste pobjednik!',
      'Vaš rezultat je: ',
      'Tako',
      'Nije', // 15

    ];
    const { flag, levels } = this.state;
    let texts = '';
    let textIndex = 0;
    switch (flag) {
      case 'poland':
        texts = pol;
        textIndex = 0;
        break;
      case 'britain':
        texts = ang;
        textIndex = 1;
        break;
      case 'croatia':
        texts = cro;
        textIndex = 2;
        break;
      default:
        break;
    }
    levels[0].name = texts[7];
    levels[1].name = texts[8];
    levels[2].name = texts[9];

    this.setState({
      texts,
      textIndex,
      optionsButton: texts[3],
      newgameButton: texts[5],
      saveButton: texts[6],
      levels,
    })
  }
  changeLanguage = (lang) => {
    let flag = lang;
    this.setState({
      flag
    }, () => this.translate())
  }
  backToStart = () => {
    const { texts } = this.state;
    (this.state.show == 'game') ?
      Alert.alert(
        texts[10],
        texts[11],
        [
          { text: texts[14], onPress: () => this.showContent('start') },
          { text: texts[15], onPress: () => console.log() },
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
      numbersToMix,
      texts,
      optionsButton,
      newgameButton,
      saveButton,
      startTexts,
      textIndex,
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
        changeLanguage={(lang) => this.changeLanguage(lang)}
        icons={this.state.icons}
        imagesType={this.state.imagesType}
        numberOfFields={this.state.numberOfFields}
        levels={this.state.levels}
        language={this.state.language}
        flag={this.state.flag}
        texts={this.state.texts}
      />

    const header = (show == 'game') ?
      <View style={styles.headersElements}>
        <LinearGradient
          colors={['transparent', '#1d8ed1']}
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
            title={optionsButton}
            onPress={() => this.showOptionsPress('options')}
            color="#1d8ed1"
            width={200}
          ></Button>
        </View>
        <View style={styles.attemptsContainer}>
          <Text style={styles.attempts}>
            {texts[4]}: {this.state.attempts}
          </Text>
        </View>
      </View>
      :
      <View style={styles.headersElements}>
        <LinearGradient
          colors={['transparent', '#1d8ed1']}
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
            title={saveButton}
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
          title={newgameButton}
          onPress={this.onNewGamePress}
          color="#1d8ed1"
        />
      </View>
      :
      <View style={styles.newGameContainer} />
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
            source={startTexts[textIndex].newGame} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.splashContainer}
          onPress={() => this.showContent('options')}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={startTexts[textIndex].settings} />
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
