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
import { useEffect, useState } from 'react';
import { Footer } from './components/footer';
import "../css/navbar.css";
import '../css/App.css';
import "../css/footer.css";
import AuthenticationModal from './components/auth';
import { Member } from './types/user';
import { sweetErrorHandling, sweetFailureProvider, sweetTopSmallSuccessAlert } from '../lib/sweetAlert';
import { serverApi } from '../lib/config';
import MemberApiService from './apiServices/memberApiService';
import { Definer } from "../lib/Definer";
import "./apiServices/verify"


const App = () => {
  //Initializations
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null),
    [path, setPath] = useState(),
    [signUpOpen, setSignUpOpen] = useState(false),
    [logInOpen, setLogInOpen] = useState(false),
    [anchor, setAnchor] = useState<null | HTMLElement>(null),
    open = Boolean(anchor),
    main_path = window.location.pathname;


  useEffect(() => {
    const memberDataJson = localStorage.getItem("member_data") ? localStorage.getItem("member_data") : null,
      member_data = memberDataJson ? JSON.parse(memberDataJson) : null
    if (member_data) {
      member_data.mb_image = member_data.mb_image ? `${serverApi}/${member_data.mb_image}` : "/auth/default_user.svg";
      setVerifiedMemberData(member_data);
    }
  }, [signUpOpen, logInOpen])

  //HANDLERS
  const handleSignUpOpen = () => setSignUpOpen(true),
    handleSignUpClose = () => setSignUpOpen(false),
    handleLogInOpen = () => setLogInOpen(true),
    handleLogInClose = () => setLogInOpen(false),
    handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => setAnchor(event.currentTarget),
    handleLogOutClose = () => setAnchor(null),
    handleLogoutRequest = async () => {
      try {
        const memberApiService = new MemberApiService();
        await memberApiService.logoutRequest();
        await sweetTopSmallSuccessAlert("success", 700, true);
      } catch (err: any) {
        console.log(err);
        sweetFailureProvider(Definer.general_err1);
      }
    };
  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          open={open}
          anchor={anchor}
          handleSignUpOpen={handleSignUpOpen}
          handleLogInOpen={handleLogInOpen}
          handleLogOutClick={handleLogOutClick}
          handleLogOutClose={handleLogOutClose}
          handleLogout={handleLogoutRequest}
          verifiedMemberData={verifiedMemberData}
        />
      ) : main_path.includes('/restaurant') ? (
        <NavbarRestaurant
          setPath={setPath}
          open={open}
          anchor={anchor}
          handleLogInOpen={handleLogInOpen}
          handleLogInClose={handleLogInClose}
          handleLogOutClick={handleLogOutClick}
          handleLogOutClose={handleLogOutClose}
          handleLogout={handleLogoutRequest}
          verifiedMemberData={verifiedMemberData}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          open={open}
          anchor={anchor}
          handleLogInOpen={handleLogInOpen}
          handleLogInClose={handleLogInClose}
          handleLogOutClick={handleLogOutClick}
          handleLogOutClose={handleLogOutClose}
          handleLogout={handleLogoutRequest}
          verifiedMemberData={verifiedMemberData}
        />
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
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
        logInOpen={logInOpen}
        handleLogInOpen={handleLogInOpen}
        handleLogInClose={handleLogInClose}
      />
    </Router>
  );
}
export default App;