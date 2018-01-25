import { login, logout, isLoggedIn,  getAccessToken } from '../../utils/AuthService';
import { initSocket, getPluginsViews, subscribeToEvent }   from '../../utils/merryhome-api';

import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';

import Menu from './Menu';
import Home from './Home';
import PluginPanel from '../PluginsComponents/PluginPanel'

export default class App extends Component {
     
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'Home',
      plugins: []
    };
  }
  
  componentDidMount(){
    //logout();
    isLoggedIn().then(isLogged=>{
        console.log("isLogged:"+isLogged);
        if(!isLogged){
            login();
        }else{
            var self= this;
            getAccessToken().then(token=>{
                initSocket(token);
                
                getPluginsViews(token).then(plugins => {
                    self.setState({plugins});
                    console.log("plugins loaded");
                }).catch(function(error){
                    console.log(error); // Network Error
                });
                
            });
        }
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });
  
  selectedContent(){
      console.log("selectedItem: "+this.state.selectedItem);
      if(this.state.selectedItem === 'Home'){
          return(
            <Home />
          );
      }else{
          for(var i=0; i< this.state.plugins.length ; i++){
            var plugin = this.state.plugins[i];
            if(plugin.link === this.state.selectedItem){
                return <PluginPanel title={plugin.link} type={plugin.type} itemType={plugin.itemType} controlePanel={plugin.controlePanel} items={plugin.list}/>
            }
          }
          return (
            <View>
                <Text>
                    Error : plugin not found !
                </Text>
            </View>
          );
      }
  }
  
  render() {
      
    const menu = <Menu onItemSelected={this.onMenuItemSelected} plugins={this.state.plugins}/>;
    const SelectedContent = this.selectedContent.bind(this);
    return (
        <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}>
            <Container>
                <Header>
                    <Left style={{ flex: 1 }}>
                        <Button transparent
                                onPress={this.toggle}>
                            <Icon name='menu' style={{color:"#FFF"}}/>
                        </Button>
                    </Left>
                    <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                          <Title>{this.state.selectedItem}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content>
                    <SelectedContent />
                </Content>
              </Container>
        </SideMenu>
    );
  }
}
