import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import { Button, Text } from 'native-base';
import { emitEvent} from '../../utils/merryhome-api';


class YoutubePlaylistVideo extends React.Component {
    
    handleClick(e) {
        emitEvent("clientSendPlaylistVideoEvent", 
                 {"id": this.props.id,
                  "num":this.props.num});
    }
    
    render() {
        const window = Dimensions.get('window');
        return (
            <Button style={{width:window.width-20, marginBottom:10}}
                  onPress={this.handleClick.bind(this)}>
                  <Image style={{width: 75, height: 75}}
                         source={{'uri':this.props.thumbnail}} />
                  <Text>{this.props.title}</Text>
            </Button>
            );
    }
};

export default YoutubePlaylistVideo;