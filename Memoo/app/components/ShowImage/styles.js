var React = require('react-native');

var myStyles = React.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    text: {
        color: 'blue',
    },
    card: {
        justifyContent: 'center',

    },
    flipCard: {
        width: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        // backfaceVisibility: 'hidden'
    },
    flipCardFront: {

    },
    box: {
        // width: 100,
        // height: 80,
        // borderWidth: 2,
        backgroundColor: '#d3f2ff',
        borderRadius: 10
    },
    flipCardBack: {
        backgroundColor: '#eaf9ff',
        position: 'absolute',
        top: 0,
    },

})

module.exports = myStyles;