var React = require('react-native');

var myStyles = React.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    link: {
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        color: 'red',
        fontSize: 20,
    }
})

module.exports = myStyles;