import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Input = ({value}) => {
  const {inputStyle, containerStyle} = styles;

  return (
    <View style={containerStyle}>
      <Text style={inputStyle}>
        {value === '0' ? 'Enter your operation' : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: Colors.colorPrimaryDark,
    padding: 5,
    fontSize: 16,
    flex: 2,
  },
  containerStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderWidth: 2.5,
    borderTopColor: Colors.darkColor,
    borderLeftColor: Colors.darkColor,
    borderRightColor: Colors.lightColor,
    borderBottomColor: Colors.lightColor,
    borderRadius: 8,
  },
});

const EditText = ({value, color, clicked, place}) => {
  const {inputStyle, containerStyle} = styles;

  return (
    <TouchableOpacity onPress={clicked}>
      <View style={containerStyle}>
        <Text style={{...inputStyle, ...{color: color}}}>
          {value === '0' ? place : value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export {Input, EditText};
