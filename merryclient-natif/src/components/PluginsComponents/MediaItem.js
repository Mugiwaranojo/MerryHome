import React from 'react';
import { emitEvent} from '../../utils/merryhome-api';

import {
  View,
} from 'react-native';
import { Button, Text } from 'native-base';

class MediaItem extends React.Component {
    
    handleClick(e) {
        emitEvent(  this.props.apiEvent, 
                    {"id": this.props.itemId,
                     "title":this.props.title,
                     "file": this.props.file});
    }
    
    render() {
       return (
            <Button style={{margin: 5, width:75, height: 75, justifyContent: 'center', alignItems: 'center'}}
                  onPress={this.handleClick.bind(this)}>
                  <Text>{this.props.title}</Text>
            </Button>
            );
    }
};

export default MediaItem;