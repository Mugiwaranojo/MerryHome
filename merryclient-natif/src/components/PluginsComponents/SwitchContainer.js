import React from 'react';
import {
  View,
} from 'react-native';
import { Button, Text } from 'native-base';
import {subscribeToEvent, emitEvent} from '../../utils/merryhome-api';

class SwitchContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { activated: props.activated };
        subscribeToEvent(props.apiEventSubscribe, (function (value){
            this.setState({activated: value});
        }).bind(this));
    }
    
    handleClick(e) {
        this.setState({activated: !this.state.activated});
        emitEvent(this.props.apiEvent, 
                 {"id": this.state.activated?"Off":"On",
                  "node": this.props.itemId});
    }
    
    render() {
    return (
        <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Button 
              disabled={this.state.activated ? true : false}
              onPress={this.handleClick.bind(this)}>
              <Text style={{color: this.state.activated ? "green": "white"}}>ON</Text>
            </Button>
            <Button 
              disabled={this.state.activated ? false : true}
              onPress={this.handleClick.bind(this)}>
              <Text style={{color: this.state.activated? "white": "green"}}>OFF</Text>
            </Button>
            <Text style={{paddingLeft: 5, paddingTop:12, color:"#FFF"}}>{this.props.title}</Text>
        </View>
        );
    }
};

export default SwitchContainer;