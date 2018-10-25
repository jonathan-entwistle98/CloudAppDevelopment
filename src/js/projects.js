import React, {Component} from 'react';
import Project from "./project";
import axios from 'axios';

class Projects extends Component {

    constructor(){
        super();
        this.state = {
            returnedObject: []
        }
    }

    componentDidMount(){
        axios.get('https://0895c6xb94.execute-api.eu-west-2.amazonaws.com/default/getProjects').then( response => {
            this.setState({
               returnedObject: response
            });
        });
    }

    render(){
        if(this.state.returnedObject["data"] == undefined) {
            return null;
        }
        console.log("------");
        console.dir(this.state.returnedObject);
        console.log("------");
        var projects = [];
        for(var i=0; i<this.state.returnedObject["data"]["Count"]; i++) {
            projects.push(
                <Project value={this.state.returnedObject["data"]["Items"][i]}/>
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