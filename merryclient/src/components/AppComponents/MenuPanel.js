import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { logout, isLoggedIn, getUser } from '../../utils/AuthService';
import {getPluginsViews, initSocket} from '../../utils/merryhome-api'

import PluginPanel from '../PluginsComponents/PluginPanel'
import { Glyphicon } from 'react-bootstrap';
import './css/MenuPanel.css';


class MenuPanel extends React.Component {
    
    constructor(props){
        super(props);
	this.state = { user: null,
                       plugins: []};
    }
    
    getPlugins(){
        getPluginsViews().then((response)=>{
           this.setState({ user: getUser(),
                           plugins: response});
           console.log(this.state.user.sub);
        }).catch(function(error){
            logout();
            //console.log(error); // Network Error
            //console.log(error.status); // undefined
            //console.log(error.code); // undefined
        });
    }
    
    componentDidMount(){
        if(isLoggedIn()){
            initSocket();
            this.getPlugins();
        }
    }
    
    render() {
        const user   = this.state.user;
        const plugins  = this.state.plugins;
        //console.log(plugins);
        if(!isLoggedIn()||!user){
            return "";
        }else{
            return (
                    <div>
                        <Menu>
                            <div className="userInfo">
                                <img src={user.picture} alt="User Avatar" className="img-circle" />
                                <span>{user.name}</span>
                                <button className="btn btn-danger log" onClick={() => logout()}>Log out </button>
                            </div>
                            <div className="menuPluginList">
                            { plugins.map((plugin, index) => (
                                <button key={"pluginLink-"+index} type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target={"#plugin-"+index}>

                                    <Glyphicon glyph={plugin.linkicon} /> 
                                    <span>{plugin.link}</span>
                                </button>
                            ))}
                            </div>
                        </Menu>
                        { plugins.map((plugin, index) => (
                            <PluginPanel  key={"plugin-"+index} id={"plugin-"+index} title={plugin.link} type={plugin.type} itemType={plugin.itemType} controlePanel={plugin.controlePanel} items={plugin.list}/>
                        ))}
                    </div>);
        }    
    }
};

export default MenuPanel;