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
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import Modal from "react-native-modal";
import GoogleStaticMap from 'react-native-google-static-map';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
console.disableYellowBox = true;

export default class Label extends React.Component {
    constructor(props){
        super(props)
        this.state={
          isModalVisible: false,
          currentIndex: 1,
          url: "https://www.google.com"
        }
    }

    urlModifier(){
        if (this.props.data[this.props.index].url.includes("images")){
            this.setState({
                url: "http://mappy.dali.dartmouth.edu/"+this.props.data[this.props.index].url.replace('//',''),
            })
        }
        else{
            this.setState({
                url: "https://www."+this.props.data[this.props.index].url.replace('//',''),
            })
        }
    }

    _toggleModal(index){
        this.setState({ 
            isModalVisible: !this.state.isModalVisible,
            currentIndex: index,
        });
        this.urlModifier();
      }
    
    renderTerms(index){
        terms = []
        if (this.props.data[index].terms_on.length > 0){
            terms.push(
                <Text style={buttonStyle.text}>Terms</Text>
            )
            for(i = 0; i < this.props.data[index].terms_on.length; i++){
                terms.push(
                    <Text>{this.props.data[index].terms_on[i]}</Text>
                )
            }
        }
        return terms
    }

    renderProjects(index){
        projects = [];
        if (this.props.data[index].project.length > 0){
            projects.push(
                <Text style={buttonStyle.text}>Projects</Text>
            )
            for(i = 0; i < this.props.data[index].project.length; i++){
                if (this.props.data[index].project[i].length > 0){
                    projects.push(
                        <Text>{this.props.data[index].project[i]}</Text>
                    )
                }
            }
        }
        return projects
    }

  render() {
        return (
          <View style={{paddingBottom: 10}}>
            <TouchableOpacity
                style={[buttonStyle.deliveryLabel]}
                onPress={() => this._toggleModal(this.props.key)}
                activeOpacity={0.7}>
                <View style={buttonStyle.container}>
                    <View style={buttonStyle.iconHolder}>
                    <Image
                        source={{uri: this.props.iconURL}}
                        style={buttonStyle.imageLabel}
                    />
                    </View> 
                    <View style={{flex: 0.04}}>
                    </View>
                    <View style={buttonStyle.nameAndTime}>
                        <Text style={buttonStyle.nameLabel}>{this.props.name}</Text>
                        <Text style={buttonStyle.message}>{this.props.message}</Text>
                    </View>
                </View>    
            </TouchableOpacity>
            <Modal 
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
            style={{alignItems: 'center', justifyContent: 'center',}}
            >
                <View style={buttonStyle.modal}>
                <TouchableOpacity onPress={() => Linking.openURL(this.state.url)}>
                <Image
                    source={{uri: this.props.iconURL}}
                    style={buttonStyle.imageModal}
                />
                </TouchableOpacity>
                <Text style={buttonStyle.name}>{this.props.name}</Text>
                <ScrollView style={{marginBottom: 10}} showsVerticalScrollIndicator={false}>
                    <Text style={buttonStyle.text}>Quote</Text>
                    <Text>{this.props.message}</Text>
                    {this.renderTerms(this.props.index)}
                    {this.renderProjects(this.props.index)}
                    <Text style={buttonStyle.text}>Hometown</Text>
                    <GoogleStaticMap
                        latitude={this.props.data[this.props.index].lat_long[0]}
                        longitude={this.props.data[this.props.index].lat_long[1]}
                        zoom={13}
                        size={{ width: (200), height: 100 }}
                        apiKey={'AIzaSyAWbYEGvOqtlo3mhXRbvpsYth9rAZF9T2Y'}
                    />
                    <Text>{this.props.data[this.props.index].lat_long[0]},{this.props.data[this.props.index].lat_long[1]}</Text>
                    <TouchableOpacity onPress={() => this._toggleModal(this.props.key)}>
                    </TouchableOpacity>
                </ScrollView>
                </View>
            </Modal>
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
  nameLabel:{
    color: '#000000',
    fontWeight: '700',
    fontSize: 22,
  },
  name:{
    color: '#000000',
    fontWeight: '800',
    fontSize: 40,
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
  imageLabel: {
    height: 68,
    width: 68,
    borderRadius: 34,
    resizeMode: 'cover',
  },
  imageModal: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  iconHolder:{
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container:{
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    height: dimensions.height*0.6,
    width: dimensions.width*0.6,
    backgroundColor: '#F5FCFF',
    padding: 6,
    borderRadius: 5,
  }
})