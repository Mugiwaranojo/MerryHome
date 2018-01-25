import React from 'react';

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
        return( <div>
                    <div className="youtube_playlists">
                        { playlists.map((item, index) => (
                            <YoutubePlaylistItem key={index} id={item.id} title={item.snippet.title} thumbnail={item.snippet.thumbnails.default.url}/>
                        ))}
                    </div>
                    <div className="youtube_playlist_content">
                        <div id="video-controls" className="controls" data-state="hidden">
                            <button id="playpause" type="button" data-state="play" onClick={this.handleClickPause.bind(this)}>Play/Pause</button>
                            <button id="stop" type="button" data-state="stop" onClick={this.handleClickStop.bind(this)}>Stop</button>
                         </div>
                        { playlist_videos.map((item, index) => (
                            <YoutubePlaylistVideo num={index} key={index} id={item.contentDetails.videoId} title={item.snippet.title} thumbnail={item.snippet.thumbnails? item.snippet.thumbnails.default.url : "./video_blank.jpg" }/>
                        ))}
                    </div>
                </div>);
    }
};

export default YoutubePanel;