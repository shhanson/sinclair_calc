import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Sinclair from './src/screens/Sinclair';
import Masters from './src/screens/Masters';

const SinclairCalc = TabNavigator({
  Sinclair: { screen: Sinclair },
  Masters: { screen: Masters },
});

AppRegistry.registerComponent('sinclair_calc', () => SinclairCalc);
