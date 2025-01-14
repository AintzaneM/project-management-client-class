import axios from 'axios';
 
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
  }


  signup = (username, password) => {
    return this.service.post('/signup', { username, password }).then(response => response.data);
  };

  loggedin = () => {
    return this.service.get('/loggedin').then(response => response.data);
  };
  
  login = (username, password) => {
    return this.service.post('/login', { username, password }).then(response => response.data);
  };
   
  logout = () => {
    return this.service.post('/logout', {}).then(response => response.data);
  };
}
 
// class AuthService is used to organize and group the methods.
// To get an object containing all the methods we just need to
// instantiate the new AuthService object.
const authService = new AuthService(); //create an instance to be able to use it
 
export default authService;