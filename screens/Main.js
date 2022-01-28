import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableNativeFeedback,
} from 'react-native';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

import {Input} from '../components/common/Input';
import {ResultOutput} from '../components/common/resultOutput';
import ButtonsContainer from '../components/ButtonsContainer';
import ButtonsContainerN from '../components/ButtonsContainerN';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import CalculatorResponse from '../components/CalculatorResponse';
import Colors from '../constants/Colors';

import {derivative} from 'mathjs';
import nerdamer from 'nerdamer/nerdamer.core.js';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import Toast from 'react-native-root-toast';
import {color} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

const Main = ({navigation}) => {
  const [question, setQuestion] = useState('');
  const [first, setFirst] = useState('0');
  const [firstNN, setFirstNN] = useState('0');
  const [second, setSecond] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState(0);
  const [resultN, setResultN] = useState(0);
  const [operation, setOperation] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [isResultN, setIsResultN] = useState(false);
  const [switchOn4, setSwitchOn4] = useState(false);

  const connection = useRef(false);
  const loaded = useRef(false);

  Platform.OS === 'android'
    ? AdMobInterstitial.setAdUnitID('ca-app-pub-9361308558657065/7045380494')
    : AdMobInterstitial.setAdUnitID('ca-app-pub-9361308558657065/7920366513');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          style={{
            marginHorizontal: 8,
            paddingHorizontal: 4,
            paddingVertical: 4,
          }}
          onPress={() => nextCheat()}>
          <Text style={{color: 'white', fontWeight: '600'}}>Help</Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      connection.current = state.isConnected;
      if (!loaded.current) {
        AdMobInterstitial.requestAd()
          .then(() => {
            loaded.current = true;
          })
          .catch(error => console.warn(error));
      }
    });
  });

  const getDev = operation => {
    try {
      let result = derivative(first, 'x');

      console.log(result.toString());

      console.log(result);

      setQuestion(first);
      setResult(result.toTex());
      setOperation(operation);
      setIsResult(true);
    } catch (error) {
      logMyErrors(error);
    }
  };

  const getIntegration = operation => {
    try {
      let result = nerdamer.integrate(first, 'x');
      console.log(result.toString());

      console.log(result);

      setQuestion(first);
      setResult(result.toTeX().concat('+C'));
      setOperation(operation);
      setIsResult(true);
    } catch (error) {
      logMyErrors(error);
    }
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

  const next = () => {
    refresh();
    navigation.navigate('Select Variables');
  };

  function nextCheat() {
    navigation.navigate('Cheat Sheet');
    if (connection && loaded.current)
      AdMobInterstitial.showAd()
        .then(() => {
          loaded.current = false;
        })
        .catch(error => console.warn(error));
  }

  const refresh = () => {
    setFirst('0');
    setFirstNN('0');
    setSecond('');
    setOperator('');
    setResult(0);
    setResultN(0);
    setIsResult(false);
    setIsResultN(false);
  };

  const setButton = button => {
    setFirst(button);
    setResult(0);
    setIsResult(false);
  };

  const getResult = () => {
    let firstN = firstNN;
    let secondN = second;
    let operatorN = operator;

    const parsedFirst = parseFloat(firstN);
    const parsedSecond = parseFloat(secondN) || 0;
    let result = 0;

    switch (operatorN) {
      case '+':
        result = parsedFirst + parsedSecond;
        break;
      case '-':
        result = parsedFirst - parsedSecond;
        break;
      case '*':
        result = parsedFirst * parsedSecond;
        break;
      case '/':
        if (!parsedSecond || parsedSecond === 0) {
          result = 'Error';
        } else {
          result = parseFloat(parsedFirst / parsedSecond).toFixed(8);
        }

        break;
      default:
      // console.log('wrong operator');
    }

    console.log(result);

    setResultN(result);
    setIsResultN(true);
  };

  handleButtonPress = button => {
    let temp = first;

    switch (button) {
      case '0':
        if (!isResult) {
          if (temp[0] !== '0' || temp.length !== 1) {
            temp += '0';
          }
          setFirst(temp);
        } else refresh;

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
      case '^':
      case ')':
      case '(':
        if (!isResult) {
          if (temp[0] === '0' && temp.length === 1) {
            temp = button;
          } else {
            temp += button;
          }
          setFirst(temp);
        } else setButton(button);

        break;

      case 'ln':
        if (!isResult) {
          if (temp[0] === '0' && temp.length === 1) {
            temp = 'log(';
          } else {
            temp += 'log(';
          }

          setFirst(temp);
        } else setButton('log(');
        break;

      case 'sqrt':
      case 'sin':
      case 'csc':
      case 'cos':
      case 'sec':
      case 'tan':
      case 'cot':
        if (!isResult) {
          if (temp[0] === '0' && temp.length === 1) {
            temp = button + '(';
          } else {
            temp += button + '(';
          }

          setFirst(temp);
        } else setButton(button + '(');
        break;

      case 'x':
      case 'y':
      case 'z':
        if (!isResult) {
          if (temp[0] === '0' && temp.length === 1) {
            temp = button;
          } else {
            temp += button;
          }

          setFirst(temp);
        } else setButton(button);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (temp[0] === '0' && temp.length === 1) {
          temp = button;
        } else {
          temp += button;
        }

        setFirst(temp);

        break;
      case 'Derivative':
        getDev(button);
        break;
      case 'Integration':
        console.log('clicked');
        getIntegration(button);
        break;
      case 'Linear Equation':
        next();
        break;
      case 'AC':
        refresh();
        break;
      case 'DEL':
        if (!isResult) {
          if (temp.length === 1) {
            refresh();
          } else {
            temp = temp.slice(0, -1);
            setFirst(temp);
          }
        } else refresh();
        break;
      default:
      // console.log('wrong operator');
    }
  };

  handleButtonPressN = button => {
    let firstN = firstNN;
    let secondN = second;
    let operatorN = operator;

    console.log('handle Button press :: ' + button);

    switch (button) {
      case '0':
        if (!isResultN) {
          if (!operatorN) {
            if (firstN[0] !== '0' || firstN.length !== 1) {
              firstN += '0';
            }
          } else if (secondN[0] !== '0' || secondN.length !== 1) {
            secondN += '0';
          } else {
            secondN = '0';
          }

          setFirstNN(firstN);
          setSecond(secondN);
          setOperator(operatorN);
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
        if (!isResultN) {
          if (!operatorN) {
            if (firstN[0] === '0' && firstN.length === 1) {
              firstN = button;
            } else {
              firstN += button;
            }
          } else if (secondN[0] === '0' && secondN.length === 1) {
            secondN = button;
          } else {
            secondN += button;
          }

          setFirstNN(firstN);
          setSecond(secondN);
          setOperator(operatorN);
        } else {
          refresh();
        }

        break;
      case '.':
        if (!operatorN) {
          if (!firstN.includes('.')) {
            firstN += button;
          }
        } else if (!secondN.includes('.')) {
          secondN += button;
        }
        setFirstNN(firstN);
        setSecond(secondN);
        setOperator(operatorN);

        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (!operatorN) {
          operatorN = button;

          setFirstNN(firstN);
          setSecond(secondN);
          setOperator(operatorN);
        } else {
          getResult();
        }
        break;
      case '=':
        getResult();
        break;
      case 'AC':
        refresh();
        break;
      default:
      // console.log('wrong operatorN');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.switch}>
        <SwitchToggle
          containerStyle={{
            width: 70,
            height: 25,
            borderRadius: 25,
            backgroundColor: '#ccc',
            padding: 5,
          }}
          circleStyle={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: 'white', // rgb(102,134,205)
          }}
          switchOn={switchOn4}
          onPress={() => setSwitchOn4(!switchOn4)}
          circleColorOff="white"
          circleColorOn={Colors.colorBlue}
          duration={500}
        />

        {switchOn4 != true ? (
          <Text style={{alignSelf: 'center', color: Colors.colorBlue}}>
            Switch to Simple Calculator
          </Text>
        ) : (
          <Text style={{alignSelf: 'center', color: Colors.colorBlue}}>
            Switch to Calculus Calculator
          </Text>
        )}
      </View>

      {switchOn4 != true ? (
        <View style={{flex: 1}}>
          <View style={styles.resultContainer}>
            {isResult ? (
              <ResultOutput
                result={result}
                question={question}
                operation={operation}
              />
            ) : (
              <Input value={first} />
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.controlContainer}>
            <ButtonsContainer handleButtonPress={handleButtonPress} />
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.resultContainerN}>
            <CalculatorResponse
              first={firstNN}
              second={second}
              operator={operator}
              result={resultN}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.controlContainerN}>
            <ButtonsContainerN
              handleButtonPress={handleButtonPressN}
              disable={true}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },

  switch: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    height: '60%',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  resultContainerN: {
    flex: 1,
    justifyContent: 'center',
  },
  controlContainerN: {
    height: '60%',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  toggleContainer: {
    flex: 1,
    backgroundColor: '#f5fcff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
