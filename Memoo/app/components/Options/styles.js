var React = require('react-native');

var myStyles = React.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  question: {
    justifyContent: 'center'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  questionText: {
    fontSize: 18,
    padding: 10,
    paddingBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  level: {
    padding: 10,
    backgroundColor: '#d3f2ff',
    justifyContent: 'center',
    borderRadius: 5,
    width: '30%',
  },
  levelText: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

module.exports = myStyles;