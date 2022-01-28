import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

class CalculatorResponse extends React.Component {
  render() {
    const {first, second, operator, result} = this.props;
    const input = `${first} ${operator} ${second}`;

    return (
      <View style={styles.containerStyle}>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{result}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.input}>
            {first === '0' && !operator ? 'Enter your operation' : input}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 25,
    paddingVertical: 25,
    paddingRight: 10,
    margin: 1,
  },

  result: {
    fontSize: 42,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  containerStyle: {
    marginHorizontal: 30,
    marginBottom: 10,
    flexDirection: 'column',
    padding: 6,
    borderWidth: 2.5,
    borderTopColor: Colors.darkColor,
    borderLeftColor: Colors.darkColor,
    borderRightColor: Colors.lightColor,
    borderBottomColor: Colors.lightColor,
    borderRadius: 8,
    overflow: 'scroll',
  },

  input: {
    fontSize: 23,
    padding: 5,
  },
});

export default CalculatorResponse;
