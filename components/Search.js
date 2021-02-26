import React from 'react';
import { View, Text } from 'react-native';

class Search extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35, color: 'white'}}>Search</Text>
      </View>
    );
  }
}

export default Search
