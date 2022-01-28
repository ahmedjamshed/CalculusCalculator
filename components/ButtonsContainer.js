import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import {CalculatorButton} from './CalculatorButton';

class CalculatorButtonsContainer extends React.Component {
  render() {
    const {handleButtonPress} = this.props;

    const {disable = false} = this.props;

    const press = disable ? () => {} : handleButtonPress;

    return (
      <View style={styles.container}>
        <View style={{height: '40%'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <View style={styles.row}>
                <CalculatorButton
                  operator={'sin'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'csc'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'ln'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'x'}
                  handleButtonPress={handleButtonPress}
                />
              </View>

              <View style={styles.row}>
                <CalculatorButton
                  operator={'cos'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'sec'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'^'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'y'}
                  handleButtonPress={handleButtonPress}
                />
              </View>

              <View style={styles.row}>
                <CalculatorButton
                  operator={'tan'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'cot'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'sqrt'}
                  handleButtonPress={handleButtonPress}
                />
                <CalculatorButton
                  operator={'z'}
                  handleButtonPress={handleButtonPress}
                />
              </View>
            </View>

            <View style={{flex: 2}}>
              <CalculatorButton
                operator={'Derivative'}
                handleButtonPress={press}
                state={disable}
              />
              <CalculatorButton
                operator={'Integration'}
                handleButtonPress={press}
                state={disable}
              />
              <CalculatorButton
                operator={'Linear Equation'}
                handleButtonPress={press}
                state={disable}
              />
            </View>
          </View>
        </View>

        <View style={{height: '60%'}}>
          <View style={styles.row}>
            <CalculatorButton
              operator={'7'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'8'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'9'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'/'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'DEL'}
              handleButtonPress={handleButtonPress}
            />
          </View>

          <View style={styles.row}>
            <CalculatorButton
              operator={'4'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'5'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'6'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'*'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'AC'}
              handleButtonPress={handleButtonPress}
            />
          </View>

          <View style={styles.row}>
            <CalculatorButton
              operator={'1'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'2'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'3'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'-'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'('}
              handleButtonPress={handleButtonPress}
            />
          </View>

          <View style={styles.row}>
            <CalculatorButton
              operator={'0'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'.'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'='}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={'+'}
              handleButtonPress={handleButtonPress}
            />
            <CalculatorButton
              operator={')'}
              handleButtonPress={handleButtonPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default CalculatorButtonsContainer;
