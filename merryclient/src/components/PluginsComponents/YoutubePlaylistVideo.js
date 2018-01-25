import React from 'react';

import './css/PlaylistItem.css';
import { emitEvent} from '../../utils/merryhome-api';


class YoutubePlaylistVideo extends React.Component {
    
    handleClick(e) {
        emitEvent("clientSendPlaylistVideoEvent", 
                 {"id": this.props.id,
                  "num":this.props.num});
    }
    
    render() {
        return (
            <button 
                  className="btn btn-default PlaylistVideoItem"
                  type="button"
                  onClick={this.handleClick.bind(this)}>
                  <img src={this.props.thumbnail} alt="thumbnail"/>
                  <span>{this.props.title}</span>
            </button>
            );
    }
};

export default YoutubePlaylistVideo;