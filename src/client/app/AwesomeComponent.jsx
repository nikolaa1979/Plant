import React from 'react';
import ProjectListEntry from './ProjectListEntry.jsx';
import ProjectsList from './ProjectsList.jsx';
import services from './api/services.jsx'

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
   
    this.onLike = this.onLike.bind(this);
    this.state = {
          likesCount : 0,
          project: {
                tag: 0,
                name : 'xxx',
                description: 'xxxxxxx'
              },
          projects: []

      };
  }
  updateProjectsList () {
        services.getProjects (null, (projs) => {
          
          this.setState ( {
            projects: projs
          });

        });
  }

  componentDidMount () {
    console.log ('compoennt did mount');
    this.updateProjectsList ();

  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  onProjectsListClick(project) {
      console.log ('project clicked ' + project);
      this.setState({
          project: project
      });
   
    }
  render() {
    var pr
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like Me</button></div>
        <ProjectListEntry project={this.state.project} onClickHandler={this.onProjectsListClick.bind(this)} />
         <div className="col-md-5">
          <ProjectsList projects={this.state.projects} onClickHandler={this.onProjectsListClick.bind(this)} />
        </div>
       
      </div>
    );
  }

}

export default AwesomeComponent;