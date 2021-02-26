import Navigator from './Navigator';
import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Text, Dimensions } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from 'axios';
import { BackHandler } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;

const Register = t.struct({
    email: t.String,
    password: t.String
})
const User = t.struct({
  email: t.String,
  password: t.String,
  remember: t.Boolean
});

class Auth extends React.Component{
    
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
    }
    componentDidMount() {
        const { nav } = this.props

      }            
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.state.red == 'log_home'
        return true;
    }
    state={red:'log_home'}
   
        handleSubmit = async () => {
            const value = this._form.getValue(); // use that ref to get the form value
            if(value == null)
                return this.setState({red:'error'});
                
            
            axios.post('http://snapchat.wac.under-wolf.eu/connection', {
                email: value.email,
                password: value.password
            })
            .then(response => {
                if(response.data.status == 200){
                    global.token = response.data.data.token;
                    this.setState({red:'logged'});
                   
                console.log(response.data)
            }
          })
        .catch(error => {
            this.setState({red:'error'});
        })
        
    }

    handleRegister = () => {
        const value = this._form.getValue();
        if(value == null)
                return this.setState({red:'error'});
            console.log('value: ', value);
            console.log(value.email)
            
            axios.post('http://snapchat.wac.under-wolf.eu/inscription', {
                email: value.email,
                password: value.password
        })
        .then(response => {
            console.log(response.data)
            if(response.data.status == 200){
                
                console.log("success")
                this.setState({red:'login_page'});
            }
          })
        .catch(error => {
            this.setState({red:'error_register'});
            console.log(error);
        })
    }
    
    render(){
        if(this.state.red == 'logged'){
            console.log('dsfsdfsfsdfsdfsd@@@@@@');
            return(
                <View style={styles.red}>
                    <Navigator/>
                </View>
            );
        }
        if(this.state.red == 'log_home'){
            console.log(this.state.red);
            return(
                <View style = { styles.container }>
                <View >
                    <Image
                    style={{
                        width: 130, 
                        height: 125
                    }}
                    source={require('./assets/snap.png')}
                    />
                </View>
                <View style={{width: "100%", position: 'absolute', bottom:0}}>
                    <Button
                    onPress={() => {
                        this.setState({red:'login_page'});
                        }}
                        height="30%"
                        title="LOG IN"
                        color="#eb3b53"
                    />
                    
                    <Button
                    onPress={() => {
                        this.setState({red:'register_page'});
                        }}
                        title="SIGN UP"
                        color="#3cb1e2"
                    />
                    
                </View> 
                </View>
            );
        }
        if(this.state.red == 'login_page' || this.state.red == 'error'){
            if(this.state.red == 'error'){
                return(
                
                    <View style={styles.container}>
                         <View >
                        <Text style = {{ fontWeight:'bold', fontSize:20, margin:50, textAlign:"center"  }}>Log In</Text>
                         </View>
                        <Text style={{ color:"red" }}>Error email or password incorrect</Text>
                        <Form 
                        ref={c => this._form = c} // assign a ref
                        type={User} 
                        options={options}
                        />
                        <Button
                        title="Sign Up!"
                        onPress={this.handleSubmit}
                        
                        />
                        <View style={{ position:"absolute", bottom:0 }}>
                        <Button 
                            title="No account ? register !"
                            color="#3cb1e2"
                            onPress={() => {
                                this.setState({red:'register_page'});
                                }}
                        />
                    </View>
                    </View>
                ); 
            }
            console.log(this.state.red);
            return(
                <View style={styles.container}>
                    <View >
                        <Text style = {{ fontWeight:'bold', fontSize:20, margin:50, textAlign:"center"  }}>Log In</Text>
                    </View>
                    
                    <Form 
                    ref={c => this._form = c} // assign a ref
                    type={User} 
                    />
                    <Button
                    title="Log In !"
                    onPress={this.handleSubmit}
                    />
                    <View style={{ position:"absolute", bottom:0 }}>
                    <Button 
                        title="No account ? register !"
                        color="#3cb1e2"
                        onPress={() => {
                            this.setState({red:'register_page'});
                            }}
                    />
                    </View>
                </View>
            );
        }
        if(this.state.red == 'register_page' || this.state.red == 'error_register'){
            if(this.state.red == 'error_register'){
                return(
                    <View style={styles.container}>
                        <View >
                            <Text style = {{ fontWeight:'bold', fontSize:20, margin:50, textAlign:"center"  }}>Register</Text>
                        </View>
                        <Text style={{ color:"red" }}>Error mail already used</Text>
                    <Form 
                    ref={c => this._form = c} // assign a ref
                    type={Register} 
                    />
                    <Button
                    title="Register !"
                    onPress={this.handleRegister}
                    />
                    <View style={{ position:"absolute", bottom:0 }}>
                    <Button 
                        title="Have an account ? Log In BOYY !"
                        color="#3cb1e2"
                        onPress={() => {
                            this.setState({red:'login_page'});
                        }}
                    />
                    </View>
                </View>

                );
            }else{

                return(
                    <View style={styles.container}>
                        <View >
                            <Text style = {{ fontWeight:'bold', fontSize:20, margin:50, textAlign:"center"  }}>Register</Text>
                        </View>
                    <Form 
                    ref={c => this._form = c} // assign a ref
                    type={Register} 
                    />
                    <Button
                    title="Register !"
                    onPress={this.handleRegister}
                    />
                    <View style={{ position:"absolute", bottom:0 }}>
                    <Button 
                        title="Have an account ? Log In BOYY !"
                        color="#3cb1e2"
                        onPress={() => {
                            this.setState({red:'login_page'});
                        }}
                    />
                    </View>
                </View>

                );
            }
        }
    }
}

const options = {
    fields: {
      email: {
        error: 'Without an email address how are you going to reset your password when you forget it?'
      },
      password: {
        error: 'Choose something you use on a dozen other sites or something you won\'t remember'
      },
    },
  };

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            backgroundColor: '#feef0c',
            justifyContent: 'center',
            alignItems: 'center'
        },
        red:
        {
            flex:1,
        }
    });

    export default Auth