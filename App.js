/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import { isIphoneX } from 'react-native-iphone-x-helper'

import Label from "./Label.js"

const dimensions = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isLoading: true,
      data: null,
      isModalVisible: false
    }
    this.getData();
  }

  getData() {
    return fetch('http://mappy.dali.dartmouth.edu/members.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          isLoading: false
        }, function() {
          // do something with new state
          console.log(this.state.data)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  generateLabels(){
    let labels = []
    for (index = 0; index < this.state.data.length; index++){
      labels.push(
        <Label
          data={this.state.data}
          key={index}
          index={index}
          name={this.state.data[index].name}
          iconURL={"http://mappy.dali.dartmouth.edu/"+this.state.data[index].iconUrl}
          message={this.state.data[index].message}
        />
      )
    }
    return labels
  }

  renderHeader(){
    if (isIphoneX()) {
      return(
        <Image
        source={require('./images/DALIHeader_X.png')}
        style={{
          height: 110,
          resizeMode: 'contain',
        }}
        />
      )
    } else {
      return(
        <Image
        source={require('./images/DALIHeader.png')}
        style={{
          height: 90,
          resizeMode: 'contain',
        }}
        />
      )
    }
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <View style={styles.container}>
          <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={false}
          />
          <View 
          style = {{
            width: 100,
            alignItems: 'center',
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 10, width: 0 },
            zIndex: 1,
          }}
          >
            {this.renderHeader()}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.welcome}>
              Meet our Members
            </Text>
          </ScrollView>
        </View>
      );
    }
    if (this.state.isLoading == false) {
      return (
        <View style={styles.container}>
          <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={false}
          />
          <View 
          style = {{
            width: 100,
            alignItems: 'center',
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 10, width: 0 },
            zIndex: 1,
          }}
          >
            {this.renderHeader()}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.welcome}>
              Meet our Members
            </Text>
            {this.generateLabels()}
          </ScrollView>
        </View>
      );
    }
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
    fontWeight: '800',
    color: '#F5FCFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
  modal: {
    height: dimensions.height*0.6,
    width: dimensions.width*0.6,
    backgroundColor: '#F5FCFF',
    padding: 6,
    borderRadius: 5,
  }
});
