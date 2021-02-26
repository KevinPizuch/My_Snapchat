import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Navigator from './Navigator';
import Auth from './Auth';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Auth />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
