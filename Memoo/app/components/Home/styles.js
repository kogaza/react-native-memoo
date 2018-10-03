var React = require('react-native');

var myStyles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d8ed1",
    justifyContent: 'space-between'
  },

  sidebar: {
    flex: 5,
  },
  header: {
    flex: 4,
    borderBottomWidth: 1,
    borderColor: '#1d8ed1',
    backgroundColor: "#FFFEB4",
  },
  mainField: {
    flex: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFEB4",
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  newGame: {
    flex: 2,
  },
  headersElements: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  newGameContainer: {
    flex: 1,
    backgroundColor: '#1d8ed1'
  },
  showOptions: {
    paddingLeft: 10,
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  attemptsContainer: {
    paddingRight: 10,
  },
  attempts: {
    fontSize: 24,
    fontWeight: "bold"
  },
})

module.exports = myStyles;