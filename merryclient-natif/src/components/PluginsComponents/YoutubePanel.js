import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import InputItem from './InputItem';
import YoutubePlaylistItem from './YoutubePlaylistItem';
import YoutubePlaylistVideo from './YoutubePlaylistVideo';
import { emitEvent, subscribeToEvent} from '../../utils/merryhome-api';

class YoutubePanel extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { isOnPause :false,
                       playlists : [],
                       playlistItems:[]};
    }
    
    handleClickPause(e) {
        if(this.state.isOnPause){
            emitEvent("clientPlayVideoEvent", null);
        }else{
            emitEvent("clientPauseVideoEvent", null);
        }
        this.setState({isOnPause : !this.state.isOnPause,
                       playlists: this.state.playlists,
                       playlistItems: this.state.playlistItems});
    }
    
    handleClickStop(e) {
        emitEvent("clientStopVideoEvent", null);
    }
    
    componentDidMount(){
        var self= this;
        emitEvent("clientGetPlaylistsEvent", null);
        subscribeToEvent("serverGetPlaylistsEvent", function(data){
            self.setState({isOnPause : self.state.isOnPause,
                           playlists: data.items,
                           playlistItems: []});
        });
        subscribeToEvent("serverGetPlaylistDetailsEvent", function(data){
            self.setState({isOnPause : self.state.isOnPause,
                           playlists: self.state.playlists,
                           playlistItems: data.items});
        });
    }
    
    render(){
        const playlists= this.state.playlists;
        const playlist_videos= this.state.playlistItems;
        const controlButtons = this.props.controlePanel.buttons;
        return( <View style={styles.container}>
                    <View style={styles.panelControl}>
                        { controlButtons.map((item, index) => (
                            <InputItem key={index} itemId={item.itemId} apiEvent={item.event} type={item.type} icon={item.icon} title={item.title}/>
                        ))}
                    </View>
                    <ScrollView 
                        horizontal={true}
                        contentContainerStyle={styles.playlists}>
                        { playlists.map((item, index) => (
                            <YoutubePlaylistItem key={index} id={item.id} title={item.snippet.title} thumbnail={item.snippet.thumbnails.default.url}/>
                        ))}
                    </ScrollView>
                    
                    <ScrollView>
                        { playlist_videos.map((item, index) => (
                            <YoutubePlaylistVideo num={index} key={index} id={item.contentDetails.videoId} title={item.snippet.title} thumbnail={item.snippet.thumbnails? item.snippet.thumbnails.default.url : "./video_blank.jpg" }/>
                        ))}
                    </ScrollView>
                </View>);
    }
};

export default YoutubePanel;
    
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding:10,
    minHeight: window.height - 80
  },
  panelControl: {
    flexDirection:'row'
  },
  playlists: {
    marginBottom: 10
  }
});