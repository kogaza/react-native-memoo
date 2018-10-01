import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  ImageBackground,
  Animated,
  Easing
} from 'react-native'


var styles = require('./styles');

export default class ShowImage extends Component {

  componentWillMount() {
    this.animatedFrontValue = new Animated.Value(0);
    this.animatedBackValue = new Animated.Value(0);
    this.spinFrontValue = new Animated.Value(0);
    this.spinBackValue = new Animated.Value(0);
    this.value = 0;
    this.animatedFrontValue.addListener(({ value }) => {
      this.value = value;
    })
  }

  flipCard(side, id) {
    if (side == 'reset') {
      Animated.timing(this.animatedFrontValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinFrontValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
      Animated.timing(this.animatedBackValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinBackValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
    } else if (side == 'back') {
      Animated.timing(this.animatedFrontValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinFrontValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.animatedBackValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinBackValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
    } else if (side == 'front') {
      this.props.showImage(id);
      Animated.timing(this.animatedFrontValue, {
        toValue: 150,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinFrontValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.animatedBackValue, {
        toValue: 150,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinBackValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }).start();
    }
  }

  render() {
    const interpolateFrontColor = this.animatedFrontValue.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
    })
    const spinFront = this.spinFrontValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-180deg', '0deg']
    })
    const animatedFrontStyle = {
      opacity: interpolateFrontColor,
      transform: [{ rotateY: spinFront }]
    }
    const interpolateBackColor = this.animatedBackValue.interpolate({
      inputRange: [0, 150],
      outputRange: [1, 0],
    })
    const spinBack = this.spinBackValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })
    const animatedBackStyle = {
      opacity: interpolateBackColor,
      transform: [{ rotateY: spinBack }]
    }

    const {
      el,
      i,
      width,
      height,
      imageId,
      visible,
      clicked,
      numberOfClicks,
      imagesType,
      newGame
    } = this.props;

    const colors = [
      require('../../images/colors/redRectangle.png'),
      require('../../images/colors/blueRectangle.png'),
      require('../../images/colors/greenRectangle.png'),
      require('../../images/colors/brownRectangle.png'),
      require('../../images/colors/pinkRectangle.png'),
      require('../../images/colors/yellowRectangle.png'),
    ]
    const fruits = [
      require('../../images/fruits/apple.png'),
      require('../../images/fruits/banana.png'),
      require('../../images/fruits/grapefruit.png'),
      require('../../images/fruits/grapes.png'),
      require('../../images/fruits/strawberry.png'),
      require('../../images/fruits/kiwi.png'),
      require('../../images/fruits/mango.png'),
      require('../../images/fruits/orange.png'),
      require('../../images/fruits/kiwano.png'),
      require('../../images/fruits/peach.png'),
      require('../../images/fruits/pear.png'),
    ]

    let images = (imagesType == 'fruits') ? fruits : colors;

    let img = '';

    switch (imageId) {
      case 1:
        img = images[0]
        break;
      case 2:
        img = images[1]
        break;
      case 3:
        img = images[2]
        break;
      case 4:
        img = images[3]
        break;
      case 5:
        img = images[4]
        break;
      case 6:
        img = images[5]
        break;
      default:
        break;
    }
    (numberOfClicks >= 2) ?
      setTimeout(
        () => this.flipCard('back')
        , 1000)
      : null;
    (numberOfClicks == 1 && newGame) ?
      this.flipCard('reset')
      : null;


    let imageBack =
      <Image
        style={{
          width: width,
          height: height,
          resizeMode: 'contain',
        }}
        source={require('../../images/memoo-logo.png')} />
    let imageFront =
      <Image
        style={{
          width: width,
          height: height,
          resizeMode: 'contain',
        }}
        source={img} />
    let field =
      (visible) ?
        (numberOfClicks < 2 && !clicked) ?
          <TouchableOpacity
            style={{ position: 'relative', margin: 2, }}
            onPress={() => this.flipCard('front', i)}
          >
            <Animated.View style={[
              animatedBackStyle,
              styles.box,
              styles.flipCardBack,
            ]} >
              {imageBack}
            </Animated.View>
            <Animated.View style={[
              animatedFrontStyle,
              styles.box
            ]}>
              {imageFront}
            </Animated.View>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={{ position: 'relative', margin: 2, }}
          >
            <Animated.View style={[
              animatedBackStyle,
              styles.box,
              styles.flipCardBack,
            ]} >
              {imageBack}
            </Animated.View>
            <Animated.View style={[
              animatedFrontStyle,
              styles.box
            ]}>
              {imageFront}
            </Animated.View>
          </TouchableOpacity>
        :
        <View
          style={{
            width: width,
            height: height,
            margin: 2
          }}
        />


    return (
      <View>
        {field}
      </View>
    )
  }
}
