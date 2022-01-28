import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../../constants/Colors';
import {EditText} from '../common/Input';
import {DynamicButton} from '../CalculatorButton';

export default LinearOutput = props => {
  const {inputStyle, containerStyle, mathstyle} = styles;
  const first = props.first === '0' ? 'Enter Your Equation' : props.first;

  const [one, setOne] = useState(Colors.colorPrimaryDark);
  const [two, setTwo] = useState(Colors.colorPrimaryDark);
  const [three, setThree] = useState(Colors.colorPrimaryDark);

  const {num} = props;

  return <></>;
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
});
