import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useCallback, useState} from 'react';
import Colors from '../constants/Colors';

const CalculatorButton = props => {
  const {state = false} = props;
  const [isDown, setDown] = useState(state);
  const handlePressIn = useCallback(() => {
    setDown(true);
  }, [setDown]);
  const handlePressOut = useCallback(() => {
    setDown(false);
  }, [setDown]);

  const borColors = isDown
    ? {
        borderTopColor: Colors.darkColor,
        borderLeftColor: Colors.darkColor,
        borderRightColor: Colors.lightColor,
        borderBottomColor: Colors.lightColor,
      }
    : {
        borderTopColor: Colors.lightColor,
        borderLeftColor: Colors.lightColor,
        borderRightColor: Colors.darkColor,
        borderBottomColor: Colors.darkColor,
      };

  const {operator, handleButtonPress} = props;
  const dynmic = dynamicStyles(operator);

  return (
    <TouchableOpacity
      onPressIn={state ? () => {} : handlePressIn}
      onPressOut={state ? () => {} : handlePressOut}
      onPress={() => handleButtonPress(operator)}
      style={{
        ...styles.container,
        ...borColors,
      }}
      activeOpacity={1}>
      <Text style={{...styles.item, ...dynmic.item}}>{operator}</Text>
    </TouchableOpacity>
  );
};

const DynamicButton = props => {
  const {state = false} = props;
  const [isDown, setDown] = useState(state);
  const handlePressIn = useCallback(() => {
    setDown(true);
  }, [setDown]);
  const handlePressOut = useCallback(() => {
    setDown(false);
  }, [setDown]);

  const borColors = isDown
    ? {
        borderTopColor: Colors.darkColor,
        borderLeftColor: Colors.darkColor,
        borderRightColor: Colors.lightColor,
        borderBottomColor: Colors.lightColor,
      }
    : {
        borderTopColor: Colors.lightColor,
        borderLeftColor: Colors.lightColor,
        borderRightColor: Colors.darkColor,
        borderBottomColor: Colors.darkColor,
      };

  const {operator, handleButtonPress} = props;
  const dynmic = dynamicStyles(operator);

  return (
    <TouchableOpacity
      onPressIn={state ? () => {} : handlePressIn}
      onPressOut={state ? () => {} : handlePressOut}
      onPress={() => handleButtonPress(operator)}
      style={{
        ...styles.containerD,
        ...borColors,
      }}
      activeOpacity={1}>
      <Text style={{...styles.item, ...dynmic.item}}>{operator}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
    borderWidth: 2,
    margin: 4,
    borderRadius: 8,
    flex: 1,
  },

  containerD: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 8,
    width: '30%',
    paddingVertical: 10,
  },

  item: {
    fontSize: 14,
    textAlign: 'center',
  },
});

const dynamicStyles = operator =>
  StyleSheet.create({
    item: {
      color:
        operator === 'DEL'
          ? 'red'
          : operator === 'AC'
          ? 'green'
          : operator === 'Solve' ||
            operator === 'Derivative' ||
            operator === 'Integration' ||
            operator === 'Linear Equation'
          ? Colors.colorBlue
          : Colors.colorPrimaryDark,
    },
  });

export {CalculatorButton, DynamicButton};
