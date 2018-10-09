import React, {Component} from 'react';

var numPeople = 5;
var people = [];
class People extends Component {
    render(){
        for(var i=0; i<numPeople; i++) {
            people.push(
                <div className="project row">
                    <div className="firstAndLastNames centerText2 col-md-3">
                        First and Last Names Placeholder
                    </div>
                    <div className="permissionLevel centerText2 col-md-6">
                        Permission Level
                    </div>
                    <div className="assignedProjects centerText2 col-md-3">
                       No. Assigned Projects
                    </div>
                </div>
            );
        }
        return (
            people
        );
    }
}

export default People;