import React from 'react';
import { View, Text } from 'react-native';

class Profile extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fb6469', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Profile</Text>
      </View>
    );
  }
}

export default Profile
