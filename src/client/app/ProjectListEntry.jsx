
import React from 'react';

class ProjectListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = props.onClickHandler;
    this.project = props.project !== undefined ? props.project : {name : '', description: ''}
  }
  render() {
    return (
      <div>
         <div onClick={() => this.onClickHandler(this.props.project)} className="video-list-entry" >
            <div className="media-body">
              <div className="video-list-entry-title">{this.props.project.name}</div>
              <div className="video-list-entry-detail">{this.props.project.description}</div>
            </div>
        </div>
       
      </div>
    );
  }
  
}
export default ProjectListEntry;


