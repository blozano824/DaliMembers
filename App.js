/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';

import Label from "./Label.js"

const dimensions = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data: null
    }
  }

  

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
        hidden={true}
        />
        <View 
        style = {{
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 10, width: 0 },
        }}
        >
        <Image
          source={require('./images/DALIlogo.png')}
          style={{
            height: 75,
            resizeMode: 'contain',
          }}
        />
        </View>
        <ScrollView>
          <Text style={styles.welcome}>
            Meet our Members
          </Text>
          <Label
            firstName={"Brayan"}
            lastName={"Lozano"}
          />
          <Label
            firstName={"Brayan"}
            lastName={"Lozano"}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(75,141,199)',
  },
  welcome: {
    fontSize: 27,
    textAlign: 'center',
    margin: 10,
    fontWeight: '700',
    color: '#F5FCFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
});
