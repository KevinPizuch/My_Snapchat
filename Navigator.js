import SwipeNavigator from 'react-native-swipe-navigation';
import Map from './components/Map';
import Notifications from './components/Notifications';
import Search from './components/Search';
import Menu from './components/Menu';
import Messages from './components/Messages';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Friend from './components/friend';
import ValidatePicture from './components/ValidatePicture';
import ValidateRecord from './components/ValidateRecord'
const Navigator = SwipeNavigator({
  Map: {
    screen: Map,
    left: 'Notifications',
    right: 'Menu',
    top: 'Search',
    bottom: 'Messages',
  },

  Notifications: {
    screen: Notifications,
    type: 'push',
  },

  Menu: {
    screen: Menu,
    type: 'over',
  },

  Search: {
    screen: Search,
    type: 'place',
  },

  Messages: {
    screen: Messages,
    right: 'Chat',
  },

  Chat: {
    screen: Chat,
    type: 'over',
    color: '#fbb464',
  },

  Profile: {
    screen: Profile,
    type: 'over',
  },

  Friend:{
    screen:Friend,
    type: 'place',
  },

  ValidatePicture:{
    screen:ValidatePicture,
    type: 'over',
  },

  ValidateRecord:{
    screen:ValidateRecord,
    type: 'over',
  }
})

export default Navigator
