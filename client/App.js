import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';

//import components
import Login from "./components/Login";
import ConvoThread from './components/ConvoThread';
import ListConvos from './components/ListConvos';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  ConvoThread: {
    screen: ConvoThread
  },
  ListConvos: {
    screen: ListConvos
  },
})

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
