import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text } from 'native-base';
import { getUserInfo, getAccessToken } from '../../utils/AuthService';
import { getPluginsViews }   from '../../utils/merryhome-api';

const window = Dimensions.get('window');
const uri = "https://gooddonegreat.com/app/img/placeholders/avatar-150x150.png";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#778899',
    padding: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    color: "white"
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5
  },
  menubutton:{
    marginBottom:  5,
    width: window.width /2
  }
});

export default class Menu extends Component {
  
  constructor(props){
    super(props);
    this.state = { user: null,
                   plugins: [] };
  }
  
  componentDidMount(){
      var self= this;
      getUserInfo().then(user=>{
          //console.log(user);
          self.setState({user});
      })
      
      getAccessToken().then(token=>{
        getPluginsViews(token).then(plugins => {
            self.setState({plugins}); 
        }).catch(function(error){
            console.log(error); // Network Error
        });
      });
     
  }
  
  render(){
    const onItemSelected = this.props.onItemSelected;
    const avatarUri = this.state.user ? this.state.user.picture : uri;
    const userName = this.state.user ? this.state.user.name : "Not connected";
    const plugins  = this.state.plugins;
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ 'uri': avatarUri }}
          />
          <Text style={styles.name}>{userName}</Text>
        </View>
        <Button style={styles.menubutton}
                onPress={() => onItemSelected("Home")}
                iconLeft>
                <Icon name="home" size={22} color="#FFF" style={{padding:10}}/>
                <Text style={{textAlign:"left"}}>Home</Text>
        </Button>
        { plugins.map((plugin, index) => (
            <Button style={styles.menubutton}
                onPress={() => onItemSelected(plugin.link)}
                key={"pluginLink-"+index} 
                iconLeft>
                <Icon name={plugin.linkicon} size={22} color="#FFF" style={{padding:10}}/>
                <Text>{plugin.link}</Text>
            </Button>
        ))}
      </ScrollView>
    );
  }
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};