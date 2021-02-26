import React from 'react';
import { View, Text } from 'react-native';

class Menu extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Menu</Text>
      </View>
    );
  }
}

export default Menu
