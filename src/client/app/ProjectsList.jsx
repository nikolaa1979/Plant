import React from 'react';

import ProjectListEntry from './ProjectListEntry.jsx';

class ProjectsList extends React.Component {
  constructor(props) { 
    super(props);
    this.onClickHandler = props.onClickHandler;

  }
  render () {
   
   return (
    <div className="video-list media">  
        {
          this.props.projects.map (project => 
           <ProjectListEntry key={project.tag} onClickHandler={this.onClickHandler} project={project} />
        )} 
    </div>
   );
  }
}

export default ProjectsList;




