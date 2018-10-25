import React, {Component} from 'react';
import moment from 'moment';

class Project extends Component {

    render() {
        var date = new Date(this.props.value["timedate"]);
        var statusText = "";
        if(this.props.value["status"] == "green"){
            statusText = "Testing In Progress";
        }else if(this.props.value["status"] == "orange"){
            statusText = "Dev in Progress";
        }else if(this.props.value["status"] == "red"){
            statusText = "Not yet started";
        }
        return (
            <div className="project row">
                <div className="projectLeader centerText2 col-md-2">
                    {this.props.value["name"]}
                </div>
                <div className="projectDescription centerText2 col-md-5">
                    Project Description: {this.props.value["description"]}
                </div>
                <div className={this.props.value["status"] + ' centerText2  col-md-2'}>
                    <h5><b>
                    {statusText}
                    </b></h5>
                </div>
                <div className="projectStartDate centerText2 col-md-3">
                    Last Edited: {moment(date).fromNow()}
                </div>
            </div>
        );
    }
}
export default Project;