import React from 'react';

import './css/PlaylistItem.css';
import { emitEvent} from '../../utils/merryhome-api';


class YoutubePlaylistItem extends React.Component {
    
    handleClick(e) {
        emitEvent("clientGetPlaylistDetailsEvent", 
                 {"id": this.props.id});
    }
    
    render() {
        return (
            <button 
                  className="btn btn-default PlaylistItem"
                  type="button"
                  onClick={this.handleClick.bind(this)}>
                  <img src={this.props.thumbnail} alt="thumbnail"/>
                  <span>{this.props.title}</span>
            </button>
            );
    }
};

export default YoutubePlaylistItem;