import '../css/App.css';
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"
import Users from './components/users';
import Dishes from './components/dishes';


const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dishes">Dishes</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/dishes'>
          <Dishes />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Container>
            <Home />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

const Home = () => {
  return (
    <h2>Home</h2>
  )
}




export default App;