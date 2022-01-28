import React from 'react';
import {TextInput, View, Text, StyleSheet, Platform} from 'react-native';
import MathView from 'react-native-math-view';
import {ScrollView} from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

const ResultOutput = ({question, result, operation}) => {
  const {inputStyle, containerStyle, mathstyle} = styles;

  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          color: Colors.colorBlue,
          fontSize: 18,
          fontWeight: '600',
        }}>
        {operation} w.r.t 'x'
      </Text>
      <View style={containerStyle}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={
              Platform.OS === 'android'
                ? inputStyle
                : {...inputStyle, ...{marginBottom: 8, marginTop: 8}}
            }>
            Question
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <MathView math={question} style={mathstyle} />
          </ScrollView>
          <Text
            style={
              Platform.OS === 'android'
                ? inputStyle
                : {...inputStyle, ...{marginBottom: 8, marginTop: 8}}
            }>
            Result
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <MathView math={result} style={mathstyle} />
          </ScrollView>
        </View>
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
    marginHorizontal: 30,
    marginVertical: 10,
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
});

export {ResultOutput};
