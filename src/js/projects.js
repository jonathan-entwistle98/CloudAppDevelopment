import React, {Component} from 'react';
import Project from "./project";
import axios from 'axios';
import moment from "moment";

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

            let props = {
                returnedObject:this.state.returnedObject["data"]["Items"][i],
                objectListPosition:i+1
            }
            projects.push(
                <Project value={props}/>
            );
        }
        return (
            <div id="projects">
                <div className="project row">
                    <div className="projectLeader centerText2 col-md-2">
                        <b>Project Name</b>
                    </div>
                    <div className="projectDescription centerText2 col-md-4">
                        <b>Project Description</b>
                    </div>
                    <div className='centerText2  col-md-2'>
                        <h5><b>
                            Project Status
                        </b></h5>
                    </div>
                    <div className="projectStartDate centerText2 col-md-3">
                        <b>Last Edited Date</b>
                    </div>
                </div>
                <div id="accordion">
                    {projects}
                </div>
            </div>
        );
    }
}
export default Projects;