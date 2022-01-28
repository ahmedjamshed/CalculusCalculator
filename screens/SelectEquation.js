import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';

import Colors from '../constants/Colors';
import {CalculatorButton} from '../components/CalculatorButton';
import NetInfo from '@react-native-community/netinfo';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';

const SelectEquation = ({navigation}) => {
  const [addReady, setAddReady] = useState(false);
  const [addLoaded, setAddLoaded] = useState(false);
  let connection = false;
  const val = useRef('');

  function next(value) {
    console.log(connection + 'in Next');
    val.current = value;
    if (connection) {
      solve();
      AdMobInterstitial.showAd()
        .then(() => {
          setAddLoaded(false);
        })
        .catch(error => console.warn(error));
    } else solve();
  }

  function solve() {
    navigation.navigate('Solve Equations', {
      number: val.current,
    });
  }

  useEffect(() => {
    NetInfo.fetch().then(state => {
      connection = state.isConnected;
      console.log(addLoaded + ' :: adload in effects');
      if (connection && !addLoaded) {
        AdMobInterstitial.requestAd()
          .then(() => {
            setAddReady(true);
            setAddLoaded(true);
          })
          .catch(error => {
            if (error.toString() === 'Error: Ad is already loaded.') {
              setAddReady(true);
              setAddLoaded(true);
            }
          });
        console.log('mai ketni bar chali houn');
      } else setAddReady(true);

      console.log(connection + ' :: connection in effects');
    });
  });

  return (
    <>
      <View style={styles.container}>
        {Platform.OS === 'android' ? (
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
        )}

        {!addReady ? (
          <ActivityIndicator size="large" color={Colors.colorPrimaryDark} />
        ) : (
          <View style={styles.innerContainer}>
            <Text style={styles.text}>Please select number of variables</Text>
            <CalculatorButton
              operator={'Two variables X and Y'}
              handleButtonPress={() => next('2')}
            />
            <CalculatorButton
              operator={'Three variables X and Y and Z'}
              handleButtonPress={() => next('3')}
            />
          </View>
        )}
        {Platform.OS === 'android' ? (
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
        )}
      </View>
      <SafeAreaView />
    </>
  );
};

export default SelectEquation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
  innerContainer: {
    maxHeight: '25%',
  },
  text: {
    color: Colors.colorPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});
