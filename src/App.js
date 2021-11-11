import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import authService from './services/auth-service';
import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoutes';


class App extends Component {

  state = {
    isLoggedIn: false,
    user: null
  };
 
  getTheUser = (userObj, loggedIn) => {
    this.setState({
      isLoggedIn: loggedIn,
      user: userObj
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then(data => {
          this.setState({
            user: data,
            isLoggedIn: true
          });
        })
        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };
 
  componentDidMount() {
    this.fetchUser();
  }


  render() {
    return (
      <div className="App">
       <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute
            user={this.state.user}
            exact
            path="/projects/:id"
            component={ProjectDetails}
            />
          <ProtectedRoute
            user={this.state.user}
            exact
            path="/projects"
            component={ProjectList}
            />
          <ProtectedRoute
            user={this.state.user}
            exact
            path="/projects/:id/tasks/:taskId"
            component={TaskDetails}
            />
        </Switch>
      </div>
    );
  }
}

export default App;