import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

var styles = require('./styles');

export default class Images extends Component {
    render() {
        const { width, height, imageId, visible } = this.props;
        const showElement = visible ? 1 : 0;
        let img = '';

        switch (imageId) {
            case 1:
                img = require('../../images/redRectangle.png')
                break;
            case 2:
                img = require('../../images/blueRectangle.png')
                break;
            case 3:
                img = require('../../images/greenRectangle.png')
                break;
            case 4:
                img = require('../../images/brownRectangle.png')
                break;
            case 5:
                img = require('../../images/pinkRectangle.png')
                break;
            case 6:
                img = require('../../images/yellowRectangle.png')
                break;
            default:
                break;
        }
        return (
            <Image
                style={{
                    width: width,
                    height: height,
                    opacity: showElement
                }}
                source={img} />

        )
    }
}