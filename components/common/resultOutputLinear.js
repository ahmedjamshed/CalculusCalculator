import React from 'react';
import {TextInput, View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../../constants/Colors';
import MathView from 'react-native-math-view';
import {ScrollView} from 'react-native-gesture-handler';

const ResultOutputLinear = ({question, result}) => {
  const {inputStyle, containerStyle, mathstyle} = styles;

  return (
    <View style={containerStyle}>
      <View style={{alignItems: 'flex-start'}}>
        <Text
          style={
            Platform.OS === 'android'
              ? inputStyle
              : {...inputStyle, ...{marginBottom: 8}}
          }>
          Result
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MathView math={result} style={mathstyle} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mathstyle: {
    marginStart: 6,
  },
  inputStyle: {
    color: Colors.colorPrimaryDark,
    fontSize: 18,
    fontWeight: '600',
  },
  containerStyle: {
    margin: 30,
    flexDirection: 'column',
    padding: 12,
    borderWidth: 2.5,
    borderTopColor: Colors.darkColor,
    borderLeftColor: Colors.darkColor,
    borderRightColor: Colors.lightColor,
    borderBottomColor: Colors.lightColor,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'space-evenly',
    overflow: 'scroll',
  },
});

export {ResultOutputLinear};
