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

export default class Label extends React.Component {

  render() {
        return (
          <View style={{paddingBottom: 10}}>
            <TouchableOpacity
                style={[buttonStyle.deliveryLabel]}
                onPress={this.props.onPress}
                activeOpacity={0.7}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.2,}}>
                    <Image
                        source={require('./images/DALIlogo.png')}
                        style={{flex:1, height: undefined, width: undefined}}
                    />
                    </View> 
                    <View style={buttonStyle.nameAndTime}>
                        <Text style={buttonStyle.text}>{this.props.firstName} {this.props.lastName}</Text>
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
    fontWeight: '700'
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
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})