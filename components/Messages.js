import React from 'react';
import { View, Text } from 'react-native';

class Messages extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#64fb71', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Messages</Text>
      </View>
    );
  }
}

export default Messages
