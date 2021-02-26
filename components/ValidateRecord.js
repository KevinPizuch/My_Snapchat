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
    Icon
  } from "react-native";
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
  import Entypo from 'react-native-vector-icons/Entypo'
import { Video } from 'expo-av';
import Friend from './friend'
import axios from 'axios'
class ValidateRecord extends React.Component{
    componentDidMount() {
        const { nav } = this.props
    }
    
    valid = () => {
      this.video.stopAsync();
      photo = record
      axios.defaults.headers.get['token'] = token;
            axios.get('http://snapchat.wac.under-wolf.eu/all')
                .then(response => {
                    let { data } = response.data;
                    global.friend = {data};
                    this.props.nav.navigate('Friend')
                })
    }
    cancel = async () => {
      this.props.nav.navigate('Map')
    }

    stopVideo = () => {
        this.props.nav.navigate('Map')
        this.video.stopAsync();
        this.video.unloadAsync();
    }
    render(){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(52, 52, 52, 0.6)' }}>
            <View >
            <View  style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
            <Entypo name="direction" style={{ position:'absolute',color: 'white', fontSize: 36, zIndex: 100, right: 0, bottom:0, marginBottom:20,marginRight:20 }} 
            onPress={this.valid}
            />                
            <MaterialCommunityIcons name="cancel" style={{color: 'white', position:'absolute', fontSize: 36, zIndex: 100, top:10, left:0, marginTop:20 }}
            onPress={ this.stopVideo }
            />
            <Video
                ref={video => {this.video = video}}
                source={{ uri: record.uri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                pauseRecordVideo={() => this.camera.pausePreview()}
                resizeMode='contain'
                shouldPlay
                isLooping
                style={{ width: '100%', height: '100%' }}
                />
              </View>
            </View>
        </View>
      );
    }
  }
  export default ValidateRecord;