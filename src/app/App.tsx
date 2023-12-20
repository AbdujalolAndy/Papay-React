import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"
import { RestaurantPage } from './screens/RestaurantPage';
import { CommunityPage } from './screens/CommunityPage';
import { OrdersPage } from './screens/OrdersPage';
import { MemberPage } from './screens/MemberPage';
import { HelpPage } from './screens/HelpPage';
import { LoginPage } from './screens/LoginPage';
import { HomePage } from './screens/HomePage';
import { NavbarHome } from './components/header';
import { NavbarRestaurant } from './components/header/restaurant';
import { NavbarOthers } from './components/header/others';
import { useState } from 'react';
import { Footer } from './components/footer';
import "../css/navbar.css";
import '../css/App.css';
import "../css/footer.css";
import Car from './screens/testCar';


const App = () => {
  const main_path = window.location.pathname;
  const [path, setPath] = useState();

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome setPath={setPath} />
      ) : main_path.includes('/restaurant') ? (
        <NavbarRestaurant setPath={setPath} />
      ) : (<NavbarOthers setPath={setPath} />
      )}

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
          {/* <HomePage /> */}
          <Car />
        </Route>
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;