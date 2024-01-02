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

import { Product } from "./types/product";
import { CartItem } from "./types/others";


const App = () => {
  //Initializations
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null),
    [path, setPath] = useState(),
    [signUpOpen, setSignUpOpen] = useState(false),
    [logInOpen, setLogInOpen] = useState(false),
    [anchor, setAnchor] = useState<null | HTMLElement>(null),
    open = Boolean(anchor),
    main_path = window.location.pathname;

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart)

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

  const onAdd = (product: Product) => {
    const exist: any = cartItems.find((item: CartItem) => item._id === product._id);
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };

  const onRemove = (data: CartItem) => {
    const item_data: any = cartItems.find((ele: CartItem) => ele._id === data._id);
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter((ele: CartItem) => ele._id !== data._id)
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === data._id ? { ...item_data, quantity: item_data.quantity - 1 } : item
      )
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  }
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter((ele: CartItem) => ele._id !== item._id)
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  }
  

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
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
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
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
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
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
        />
      )}

      <Switch>
        <Route path='/restaurant'>
          <RestaurantPage onAdd={onAdd} />
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