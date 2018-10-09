import React, {Component} from 'react';

var projectTagColor = "green";

class Project extends Component {

    render() {
        return (
            <div className="project row">
                <div className="projectLeader centerText2 col-md-3">
                    Project Leader
                </div>
                <div className="projectDescription centerText2 col-md-6">
                    Project Description
                </div>
                <div className={projectTagColor + ' centerText2  col-md-1'}>
                </div>
                <div className="projectStartDate centerText2 col-md-2">
                    Project Start Date
                </div>
            </div>
        );
    }
}
export default Project;