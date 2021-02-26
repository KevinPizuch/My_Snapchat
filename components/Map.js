import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  TouchableWithoutFeedback
} from "react-native";
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import Constants from 'expo-constants';
import Auth from '../Auth'
import * as ImagePicker from 'expo-image-picker';
import Friend from './friend';
import ValidatePicture from './ValidatePicture';
import ValidateRecord from './ValidateRecord'
import * as FaceDetector from 'expo-face-detector';
import { Emitter } from 'react-native-particles';
class Map extends React.Component {
  componentDidMount() {
   const { nav } = this.props
   axios.defaults.headers.get['token'] = token;
           axios.get('http://snapchat.wac.under-wolf.eu/snaps')
           .then(response => {
               console.log(response.data.data)
               global.snap = response;
               console.log("kek");
           })
  }

  constructor(props) {
    super(props);
    this.state = {
      friend: '',
      record: false
    };
  }
  
  snap = async () => {
    
      let res = await this.camera.takePictureAsync({exif:true})
      global.photo = res
      this.props.nav.navigate('ValidatePicture')
            axios.defaults.headers.get['token'] = token;
            axios.get('http://snapchat.wac.under-wolf.eu/all')
                .then(response => {
                    let { data } = response.data;
                    global.friend = {data};
                    console.log("friend created");

                })
                .catch(err => console.log(err, 'friend error'))
              console.log("kek");
    
};

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
        });
        photo = result;
        this.props.nav.navigate('ValidatePicture')
        axios.defaults.headers.get['token'] = token;
            axios.get('http://snapchat.wac.under-wolf.eu/all')
                .then(response => {
                    let { data } = response.data;
                    global.friend = {data};
                })
            
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { audio } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({ hasCameraPermission: status === 'granted' })
        this.setState({ hasCameraRollPermission: roll === 'granted' })
        this.setState({ hasAudioRecordingPermission: audio === 'granted' })
        const { nav } = this.props
    }

    longPress = async () => {
        if (this.camera) {
            try {
              const promise = this.camera.recordAsync({maxDuration:3, quality:'1080p'});
              if (promise) {
                    this.setState({ isRecording: true });
                    const data = await promise;
                    this.setState({ isRecording: false });
                    const asset = await MediaLibrary.createAssetAsync(data.uri);
                    global.record = data;
                    this.props.nav.navigate('ValidateRecord')
              }
            } catch (e) {
              console.error(e);
            }
          }
    }

    stopRec = () => {
        console.log("stop")
        
    }

    handleFacesDetected = () =>{
        console.log('face !')
    }

    render() {
        const { hasCameraPermission } = this.state
        if(typeof success !== 'undefined'){
            <View>

            </View>
        }
        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type}
                      ref={ref => {
                        this.camera = ref;
                      }}                    
                    >

                        <Header
                            style={{
                                backgroundColor: 'transparent',
                                left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center', marginTop:10
                            }}
                        >
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Icon name="logo-snapchat" style={{ color: 'white', marginTop:2 }} />
                                
                            </View>

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="ios-reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
                            </View>
                        </Header>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name="message-reply"
                                style={{ color: 'white', fontSize: 36 }}
                            ></MaterialCommunityIcons>

                            <TouchableWithoutFeedback 
                                   
                                   onPressOut={ this.stopRec }
                                >
                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name="circle-outline"
                                    style={{ color: 'white', fontSize: 100 }}
                                    onPress={ 
                                        this.snap
                                    }
                                    onLongPress={ this.longPress }
                                   
                                ></MaterialCommunityIcons>
                                <Icon name="ios-images" style={{ color: 'white', fontSize: 36 }} 
                                    onPress={ this._pickImage }
                                />
                            </View>
                                </TouchableWithoutFeedback>
                            <MaterialCommunityIcons name="google-circles-communities"
                                
                                style={{ color: 'white', fontSize: 36 }}
                            ></MaterialCommunityIcons>

                        </View>
                    </Camera>
                </View>
            )
        }
    }
}
export default Map;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
