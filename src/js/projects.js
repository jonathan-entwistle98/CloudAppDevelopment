import React, {Component} from 'react';
import Project from "./project";

var numProjects = 10;

class Projects extends Component {
    render(){
        var projects = [];
        for(var i=0; i<numProjects; i++) {
            projects.push(
                <Project />
            );
        }
        return (
            <div id="projects">
                {projects}
            </div>
        );
    }
}
export default Projects;