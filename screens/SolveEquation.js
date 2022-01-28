import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

import ButtonsContainer from '../components/ButtonsContainer';
import Colors from '../constants/Colors';
import {EditText} from '../components/common/Input';
import {ResultOutputLinear} from '../components/common/resultOutputLinear';
import {DynamicButton} from '../components/CalculatorButton';
import nerdamer from 'nerdamer/nerdamer.core.js';
import 'nerdamer/Solve.js';
import 'nerdamer/Calculus.js';
import Toast from 'react-native-root-toast';
import {AdMobBanner} from 'react-native-admob';

const SolveEquation = ({route}) => {
  const [first, setFirst] = useState('0');
  const [second, setSecond] = useState('0');
  const [third, setThird] = useState('0');
  const [selected, setSelected] = useState('1');

  const [result, setResult] = useState(['']);
  const [isResult, setIsResult] = useState(false);

  const [one, setOne] = useState('green');
  const [two, setTwo] = useState(Colors.colorPrimaryDark);
  const [three, setThree] = useState(Colors.colorPrimaryDark);

  const {number} = route.params;

  let temp = '';

  function changeColor(num) {
    switch (num) {
      case '1':
        setOne('green');
        setTwo(Colors.colorPrimaryDark);
        setThree(Colors.colorPrimaryDark);
        setSelected('1');
        break;

      case '2':
        setOne(Colors.colorPrimaryDark);
        setTwo('green');
        setThree(Colors.colorPrimaryDark);
        setSelected('2');
        break;

      case '3':
        setOne(Colors.colorPrimaryDark);
        setTwo(Colors.colorPrimaryDark);
        setThree('green');
        setSelected('3');
        break;

      default:
        console.log('default Clicked');
    }
  }

  const solveHandler = () => {
    try {
      let arr = number === '2' ? [first, second] : [first, second, third];
      console.log(arr);
      let sol = nerdamer.solveEquations(arr);
      console.log(sol);
      let resArray = [];

      for (let x = 0; x < sol.length; x++) {
        resArray[x] = sol[x].toString().replace(',', '=');
      }

      console.log(resArray);
      setResult(resArray.toString());
      setIsResult(true);
    } catch (error) {
      logMyErrors(error);
    }
  };

  const refresh = () => {
    console.log('clicked');
    setFirst('0');
    setSecond('0');
    setThird('0');
    setResult(0);
    temp = '0';
    setIsResult(false);
  };

  function logMyErrors(params) {
    console.log(params);
    let toast = Toast.show('Syntax Error', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  }

  const handleButtonPress = button => {
    const flag = isResult;
    temp = selected === '1' ? first : selected === '2' ? second : third;

    switch (button) {
      case '0':
        if (!flag) {
          if (temp !== '0' || temp.length !== 1) {
            temp += '0';
          }
        } else {
          refresh();
        }

        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (!flag) {
          if (temp === '0' && temp.length === 1) {
            temp = button;
          } else {
            temp += button;
          }
        } else {
          refresh();
        }

        break;
      case '.':
        /*if (!operator) {
                      if (!temp.includes('.')) {
                        temp += button;
                      }
                    } else if (!second.includes('.')) {
                      second += button;
                    }

                    this.setState({ temp, second, operator });
                    */
        break;

      case 'ln':
        if (!flag) {
          if (temp === '0' && temp.length === 1) {
            temp = 'log';
          } else {
            temp += 'log';
          }
        } else {
          refresh();
        }
        break;

      case 'sin':
      case 'csc':
      case 'cos':
      case 'sec':
      case 'tan':
      case 'cot':
        if (!flag) {
          if (temp === '0' && temp.length === 1) {
            temp = button;
          } else {
            temp += button;
          }
        } else {
          refresh();
        }
        break;

      case 'sqrt':
      case '^':
      case ')':
      case '(':
        if (!flag) {
          if (temp === '0' && temp.length === 1) {
            temp = button;
          } else {
            temp += button;
          }
        } else {
          refresh();
        }
        break;

      case 'x':
      case 'y':
      case 'z':
        if (!flag) {
          if (temp === '0' && temp.length === 1) {
            temp = button;
          } else {
            temp += button;
          }
        } else {
          refresh();
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        if (temp === '0' && temp.length === 1) {
          temp = button;
        } else {
          temp += button;
        }
        break;
      case 'AC':
        refresh();
        break;
      case 'DEL':
        if (!flag) {
          if (temp.length === 1) {
            temp = temp.slice(0, -1);
          } else {
            temp = temp.slice(0, -1);
          }
        } else {
          refresh();
        }
        break;
      default:
      // console.log('wrong operator');
    }
    selected === '1'
      ? setFirst(temp)
      : selected === '2'
      ? setSecond(temp)
      : setThird(temp);
  };

  if (!isResult) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.resultContainer}>
          <View style={styles.containerStyle}>
            <EditText
              value={first}
              color={one}
              place="Enter First Equation"
              clicked={() => {
                changeColor('1');
              }}
            />
            <EditText
              value={second}
              color={two}
              place="Enter Second Equation"
              clicked={() => {
                changeColor('2');
              }}
            />
            {number === '2' ? (
              undefined
            ) : (
              <EditText
                value={third}
                color={three}
                place="Enter Third Equation"
                clicked={() => {
                  changeColor('3');
                }}
              />
            )}

            <DynamicButton
              operator={'Solve'}
              handleButtonPress={solveHandler}
            />
          </View>

          {number === '2' ? (
            Platform.OS === 'android' ? (
              <AdMobBanner
                adSize="smartBanner"
                adUnitID="ca-app-pub-9361308558657065/1984625508"
                onAdFailedToLoad={error => console.error(error)}
              />
            ) : (
              <AdMobBanner
                adSize="smartBanner"
                adUnitID="ca-app-pub-9361308558657065/1546529858"
                onAdFailedToLoad={error => console.error(error)}
              />
            )
          ) : (
            undefined
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.controlContainer}>
          <ButtonsContainer
            handleButtonPress={handleButtonPress}
            disable={true}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.resultContainer}>
          <ResultOutputLinear result={result.toString()} />
        </View>

        <View style={styles.divider} />

        <View style={styles.controlContainer}>
          <ButtonsContainer
            handleButtonPress={handleButtonPress}
            disable={true}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default SolveEquation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },

  divider: {
    height: 0,
    borderBottomColor: Colors.darkColor,
    borderTopColor: Colors.lightColor,
    borderRadius: 4,
    borderWidth: 1,
  },

  resultContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  controlContainer: {
    height: '53%',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerStyle: {
    flexDirection: 'column',
    flex: 1,
  },
});
