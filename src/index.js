import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './js/app.js';
import Users from './js/users.js';
import People from './js/people.js';

const projectContainer = document.getElementById("container");
ReactDOM.render(<App />, projectContainer);

const usersContainer = document.getElementById("leader")
ReactDOM.render(<Users />, usersContainer);

const peopleContainer = document.getElementById("people")
ReactDOM.render(<People />, peopleContainer);