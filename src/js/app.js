import React, {Component} from 'react';
import Projects from "./projects";
import '../css/index.css';
import '../css/bootstrap.min.css';
import '../js/react.min.js';
import '../js/react-dom.min.js';
import '../js/bootstrap.min.js';
import '../js/bootstrap-select.min.js';

class App extends Component {
    render(){
        return(
            <Projects />
        );
    }
}
export default App;