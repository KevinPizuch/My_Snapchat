import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    Icon
  } from "react-native";
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
  import Entypo from 'react-native-vector-icons/Entypo'
import Map from './Map'
import Friend from './friend'

class ValidatePicture extends React.Component{
  componentDidMount() {
    const { nav } = this.props
  }
    state={
        image: photo
    }
    valid = () => {
      this.props.nav.navigate('Friend')
    }
    cancel = async () => {
      this.props.nav.navigate('Map')
    }

    render(){
            let { image } = this.state;
          return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#fff' }}>
                <View >
                <View  style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                <Entypo name="direction" style={{ position:'absolute',color: 'white', fontSize: 36, zIndex: 100, right: 0, bottom:0, marginBottom:20,marginRight:20 }} 
                onPress={this.valid}
                />                
                <MaterialCommunityIcons name="cancel" style={{color: 'white', position:'absolute', fontSize: 36, zIndex: 100, top:10, left:0, marginTop:20 }}
                onPress={ this.cancel }
                />
                <Image source={{ uri: photo.uri }} style={{height:700, width:400}} />
                  </View>
                </View>
            </View>
          );
        }
  }

  export default ValidatePicture;
        