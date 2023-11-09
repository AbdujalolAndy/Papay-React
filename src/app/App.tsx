import '../css/App.css';
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"
import { RestaurantPage } from './screens/RestaurantPage';
import { CommunityPage } from './screens/CommunityPage';
import { OrdersPage } from './screens/OrdersPage';
import { MemberPage } from './screens/MemberPage';
import { HelpPage } from './screens/HelpPage';
import { LoginPage } from './screens/LoginPage';
import { HomePage } from './screens/HomePage';


const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to="/restaurant">RestaurantPage</NavLink>
          </li>
          <li>
            <NavLink to="/community">CommunityPage</NavLink>
          </li>
          <li>
            <NavLink to="/orders">OrdersPage</NavLink>
          </li>
          <li>
            <NavLink to="/member-page">MemberPage</NavLink>
          </li>
          <li>
            <NavLink to="/help">HelpPage</NavLink>
          </li>
          <li>
            <NavLink to="/login">LoginPage</NavLink>
          </li>
          <li>
            <NavLink to="/">HomePage</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/restaurant'>
          <RestaurantPage />
        </Route>
        <Route path='/community'>
          <CommunityPage />
        </Route>
        <Route path='/orders'>
          <OrdersPage />
        </Route>
        <Route path='/member-page'>
          <MemberPage />
        </Route>
        <Route path='/help'>
          <HelpPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;