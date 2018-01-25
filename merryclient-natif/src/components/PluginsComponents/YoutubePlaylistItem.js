import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';

import { Button, Text } from 'native-base';
import { emitEvent} from '../../utils/merryhome-api';


class YoutubePlaylistItem extends React.Component {
    
    handleClick(e) {
        emitEvent("clientGetPlaylistDetailsEvent", 
                 {"id": this.props.id});
    }
    
    render() {
        return (
            <Button style={{height:75,width:75, alignItems:'center',justifyContent:'center', marginRight:10 }}
                onPress={this.handleClick.bind(this)}>
                <Image style={{width: 75, height: 75}} source={{'uri': this.props.thumbnail}} />
                <Text style={{position:"absolute"}}>{this.props.title}</Text>
            </Button>
            );
    }
};

export default YoutubePlaylistItem;