import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/auth-service';

class Navbar extends React.Component {
  
    logoutUser = () => {
      authService.logout().then(() => {
        this.props.getUser(null, false);
      });
    };
   
    render() {
      const { userIsLoggedIn, userData } = this.props;
   
      if (userIsLoggedIn) {
        return (
          <nav className="nav-style">
            <ul>
              {userIsLoggedIn && <li>Welcome, {userData.username}</li>}
              <li>
                <Link to="/projects" style={{ textDecoration: 'none' }}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button onClick={() => this.logoutUser()}>Logout</button>
                </Link>
              </li>
            </ul>
          </nav>
        );
      } else {
        return (
          <div>
            <nav className="nav-style">
              <ul>
                <li>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    Signup
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        );
      }
    }
  
  
}

export default Navbar;
