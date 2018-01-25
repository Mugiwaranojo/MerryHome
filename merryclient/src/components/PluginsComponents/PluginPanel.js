import React from 'react';
import {PluginItem} from './PluginItem';
import YoutubePanel from './YoutubePanel';
import InputItem from './InputItem';

class PluginPanel extends React.Component {
    
    PluginContent(props){
        if(props.type==="List"){
            const controlButtons = props.controlePanel ? props.controlePanel.buttons : [];
            //console.log(props.controlePanel);
            return (<div className="modal-body">
                        <div className="controlePanelPlugin">
                        { controlButtons.map((item, index) => (
                            <InputItem key={index} itemId={item.itemId} apiEvent={item.event} type={item.type} icon={item.icon} title={item.title}/>
                        ))}
                        </div>
                        { props.items.map((item, index) => (
                             <PluginItem key={index} itemType={props.itemType} title={item.name? item.name:item.title} itemId={item.itemId} type={item.type} icon={item.icon} file={item.file} activated={item.activated}  apiEvent={item.event} apiEventSubscribe={item.eventSubscribe}/>
                        ))}
                    </div> );
        }else if(props.type==="YoutubePanel"){
            return (<div className="modal-body">
                        <YoutubePanel />
                    </div>);
        }else{
            return "";
        }
    }
    
    render(){
        const PluginContent = this.PluginContent;
        const panelSize = (this.props.itemType==="SwitchContainer" || this.props.itemType==="Input" || this.props.itemType==="SensorItem")? "modal-sm": "modal-lg";
        return (
                <div className="modal fade pluginPanel" id={this.props.id} role="dialog">
                    <div className={"modal-dialog "+panelSize}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">{this.props.title}</h4>
                            </div>
                            <PluginContent type={this.props.type}  items={this.props.items} itemType={this.props.itemType} controlePanel={this.props.controlePanel}/>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
    }
};

export default PluginPanel;