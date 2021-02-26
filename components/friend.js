import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Button,
    TouchableOpacity,
    Image
  } from "react-native";
import Dialog from "react-native-dialog";
import t from 'tcomb-form-native'; // 0.6.9
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ValidatePicture from './ValidatePicture';
import Map from './Map'


const Form = t.form.Form;
const Time = t.struct({
  time: t.Number
});
class Friend extends React.Component{
  componentDidMount() {
    this.getPermissionAsync();
    const { nav } = this.props

  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  state = {
    dialogVisible: true,
    time: true,
    to: '',
    image: photo,
    imagePick: true
  };

  constructor(props) {
    super(props);

    this.onPress = this.handleSnap.bind(this);
  }
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    const value = this._form.getValue();
    global.duration = value.time;
    this.setState({ time: false });
  };
 
  handleSnap = async (to) => {
    this.props.nav.navigate('Map')
    console.log(to,duration,this.state.image.uri)
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios.defaults.headers.post['token'] = token;
    console.log(photo)
    const form = new FormData();
    
      let type = this.state.image.uri.substr(this.state.image.uri.length - 3);
      if(type == 'jpg'){
        form.append('image', {
          uri: this.state.image.uri,
          type: 'image/jpg',
          name: 'image.jpg',
        });
      }else{
        form.append('image', {
          uri: this.state.image.uri,
          type: 'video/mp4',
          name: 'video.mp4',
        });
      }

      form.append('duration', duration);

      form.append('to', to)

      fetch('http://snapchat.wac.under-wolf.eu/snap', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': token
        },
        body: form
      })
      .then(response => {
        if(response.status == 200){
           console.log('fksdkfsd')
          }
        else{
          console.log(response)
        }
      }).catch(err => {
        console.log(err)
      })
  }
  
    render(){
      let { image } = this.state;
      var f = [];
      for (let index = 0; index < friend.data.length; index++) {
        f.push(
          <View key= { index } style={{width: "70%", marginTop:3, marginBottom:3}} >
              <Button
                       
                       title={friend.data[index].email}
                        color="#eb3b53"
                        onPress={ () => this.handleSnap(friend.data[index].email )}
                        //onPress={ () => this.handleChoosePhoto }
                         
                  
                        />
          </View>
  
  )
  
      }

      if(this.state.time){
        return(
          <View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Temps du snap</Dialog.Title>
            <Form 
                ref={c => this._form = c} // assign a ref
                type={Time}
            />
            <Dialog.Input wrapperStyle={{ borderColor:'grey' }}></Dialog.Input>
            <Dialog.Button label="Annuler" onPress={this.handleCancel} />
            <Dialog.Button label="Envoyer" onPress={this.handleDelete} />
          </Dialog.Container>
         </View>
        );
      }
      if(!this.state.time){
        return(
          <SafeAreaView style={{flex:1}}>
              <ScrollView >
            
                  <View style={{flex: 1, backgroundColor: '#63bcfc', alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 1}}>
                  <View style={{ paddingTop: 150}}></View>
                  
                  {f}
                  <View style={{ marginBottom: 50}}></View>
                  </View>
              </ScrollView>
          </SafeAreaView>
        );
      }
    }
  }
  
  export default Friend;