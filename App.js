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
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";

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

  render() {
    if (this.state.isLoading == true) {
      return <View><Text>Loading...</Text></View>;
    }
    if (this.state.isLoading == false) {
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
    fontWeight: '700',
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
