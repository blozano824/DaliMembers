import React, {
  Component
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

const dimensions = Dimensions.get('window');
console.disableYellowBox = true;

export default class Label extends React.Component {

  render() {
        return (
          <View style={{paddingBottom: 10}}>
            <TouchableOpacity
                style={[buttonStyle.deliveryLabel]}
                onPress={this.props.onPress}
                activeOpacity={0.7}>
                <View style={buttonStyle.container}>
                    <View style={buttonStyle.iconHolder}>
                    <Image
                        source={{uri: this.props.iconURL}}
                        style={buttonStyle.image}
                    />
                    </View> 
                    <View style={{flex: 0.02}}>
                    </View>
                    <View style={buttonStyle.nameAndTime}>
                        <Text style={buttonStyle.text}>{this.props.name}</Text>
                        <Text style={buttonStyle.message}>{this.props.message}</Text>
                    </View>
                </View>    
            </TouchableOpacity>
          </View>
        );

  }
}

const buttonStyle = StyleSheet.create({
  text:{
    color: '#000000',
    fontWeight: '700',
    fontSize: 18,
  },
  message:{
    color: '#000000',
    fontWeight: '700',
    fontSize: 12,
  },
  deliveryLabel:{
    width: dimensions.width*0.9,
    height: 80,
    borderColor: '#000000',
    backgroundColor: '#F5FCFF',
    borderWidth: 0,
    padding: 6,
    borderRadius: 5,
  },
  nameAndTime:{
    flex: 0.7,
    flexDirection: 'column',
  },
  image: {
    height: 68,
    width: 68,
    borderRadius: 34,
    resizeMode: 'center',
  },
  iconHolder:{
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container:{
    flex: 1, 
    flexDirection: 'row'
  }
})