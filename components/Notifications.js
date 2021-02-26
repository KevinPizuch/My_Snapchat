import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios'
import { Video } from 'expo-av';
import { BackHandler } from 'react-native';
import CountDown from 'react-native-countdown-component';
//import CountDown to show the timer

import moment from 'moment';
//import moment to help you play with date and time

class Notifications extends React.Component {
  
  state={
    image:null,
    snapT:false,
    snapV:false,
    duration:0,
    from:null
  }
  componentDidMount() {
    const { nav } = this.props
    console.log("unmont1")
    
  }
  
  setTimer = () => {
    console.log('yeah')
    var that = this;

    //We are showing the coundown timer for a given expiry date-time
    //If you are making an quize type app then you need to make a simple timer
    //which can be done by using the simple like given below
    // //which is 30 sec

    var date = moment()
      .utcOffset('+01:00')
      .format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC   
    
    var expirydate = date;//You can set your own date-time
    //Let suppose we have to show the countdown for above date-time 

    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    
    var d = hours * 60 * 60 + minutes * 60 + (seconds + this.state.duration);
    //converting in seconds

    that.setState({ totalDuration: d });
    //Settign up the duration of countdown in seconds to re-render
  }
  constructor(props) {
    super(props)
    this.seen = this.seen.bind(this);
    
}
                

componentWillMount() {
  console.log("unmont2")

    BackHandler.addEventListener('hardwareBackPress', this.seen);
}

componentWillUnmount() {
    console.log("unmont")
    BackHandler.removeEventListener('hardwareBackPress', this.seen);
}

  handleBackButtonClick = async () => {
      this.seen
      return true;
  }

  seen = async () =>{
    console.log("seen")
    axios.defaults.headers.get['token'] = token;
    axios.defaults.headers.get['Content-Type'] = "application/json";
    axios.post('http://snapchat.wac.under-wolf.eu/seen', {
      id : this.state.from
    })
      .then(response => {
        this.props.nav.navigate('Map')
        this.setState({snapV:false})
        this.setState({snapT:false})
        this.setState({image:null})
        axios.defaults.headers.get['token'] = token;
           axios.get('http://snapchat.wac.under-wolf.eu/snaps')
           .then(response => {
               console.log(response.data.data)
               
               global.snap = response;
               console.log("kek");
           })
          //console.log(response)
      })
      .catch(e => console.log(e))
  }

  snapFrom = async (from) => {
    console.log('kek', from)
    axios.get('http://snapchat.wac.under-wolf.eu/snap/' + from)
    .then(response =>{
        this.setState({from:from})
        this.setState({duration:response.data.data.image.duration})
        console.log('@@@@@@@@@@@@@@@@@@@--------------------@@@@@@@@@@@@@@@')
        console.log(response.data.data._id)
        let type = response.data.data.image.link.substr(response.data.data.image.link.length - 3);
        this.setState({image:response.data.data.image.link})
        this.setState({ totalDuration: response.data.data.duration });
        if(type == 'mp4'){
          this.setState({snapV:true})
        }else{
          this.setState({snapT:true})
        }
    })
  }
  
  render() {
    
    var f = [];
    if(typeof snap !== 'undefined'){
                        for (let index = 0; index < snap.data.data.length; index++) {
                            f.push(
                            <View key= { index } style={{width: "70%", marginTop:3, marginBottom:3}} >
                                <Button
                                    title={snap.data.data[index].from}
                                    color="#eb3b53"
                                    onPress={ () => this.snapFrom(snap.data.data[index]._id) }
                                />
                            </View>
                            )
                        }
    }else{
      f = <View><Text>Aucun snap</Text></View>
    }
    
    if(!this.state.snapT && !this.state.snapV){
      return (
        <View style={{flex: 1, backgroundColor: '#a064fb', alignItems: 'center', justifyContent: 'center'}}>
          {f}
        </View>
      );
    }
    if(this.state.snapT){
      {this.setTimer}
      return (
        <View style={{flex: 1, backgroundColor: '#a064fb', alignItems: 'center', justifyContent: 'center'}}>
             <Image
            style={{width: 400, height: 700}}
            source={{uri: 'http://snapchat.wac.under-wolf.eu/' + this.state.image}}
          />
           <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top:10, zIndex: 100 }}>
              <CountDown
                until={this.state.totalDuration}
                timetoShow={('M', 'S')}
                onFinish={this.seen}
                size={20}
              />
            </View>
        </View>
      )
    }
    if(this.state.snapV){
      return (
        <View style={{flex: 1, backgroundColor: '#a064fb', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
          <Video
                ref={video => {this.video = video}}
                source={{ uri: 'http://snapchat.wac.under-wolf.eu/' + this.state.image }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                //pauseRecordVideo={() => this.camera.pausePreview()}
                resizeMode='contain'
                shouldPlay
                isLooping
                style={{ width: '100%', height: '100%' }}
                />
                <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top:10, zIndex: 100 }}>
              <CountDown
                until={this.state.totalDuration}
                timetoShow={('M', 'S')}
                onFinish={this.seen}
                size={20}
              />
            </View>
        </View>
      )
    }
  }
}

export default Notifications
