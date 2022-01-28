import React, {useEffect} from 'react';

import Colors from './constants/Colors';
import Main from './screens/Main';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform, Button} from 'react-native';
import SelectEquation from './screens/SelectEquation';
import SolveEquation from './screens/SolveEquation';
import cheatSheet from './screens/cheetSheet';

import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Calculus Calculator',
            headerStyle: {
              backgroundColor: Colors.colorPrimary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Select Variables"
          component={SelectEquation}
          options={{
            headerStyle: {
              backgroundColor: Colors.colorPrimary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Solve Equations"
          component={SolveEquation}
          options={{
            headerStyle: {
              backgroundColor: Colors.colorPrimary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Cheat Sheet"
          component={cheatSheet}
          options={{
            headerStyle: {
              backgroundColor: Colors.colorPrimary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
