import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Account from "./Account";
import Home from "./Home";
import Journals from "./Journals";
import Journal from "./Journal";
import Login from "./Login";
import Logout from "./Logout";
import Nav from "./Nav";
import Register from "./Register";
import About from "./About";
import Entries from "./Entries";
import Entry from "./Entry";
import FooterNav from "./FooterNav";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Order from "./Order";
import Admin from "./Admin/Admin";
import NotAdmin from "./Admin/NotAdmin";
import AdminShop from "./Admin/AdminShop";
import AdminShopCreate from "./Admin/AdminShopCreate";
import Shop from "./ShopComponents/Shop";
import Shopping from "./ShopComponents/Shopping";
import ShopShirts from "./ShopComponents/ShopShirts";
import ShopHealthProducts from "./ShopComponents/ShopHealthProducts";
import ShopMugs from "./ShopComponents/ShopMugs";
import { useRef } from "react";

import { fetchCart, fetchShops, fetchUserReviews } from "../store";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const prevAuth = useRef({});

  useEffect(() => {
    dispatch(fetchShops());
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <Nav />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/cart' element={ <Cart /> } />
          <Route path="/journals" element={<Journals />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<Order />} />
          {!!auth.id && <Route path="/journals/:id" element={<Journal />} />}
          <Route path="/account" element={<Account />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/entries/:id" element={<Entry />} />

          {auth.adminStatus === true ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route path="/admin" element={<NotAdmin />} />
          )}
          <Route path="/admin/shop" element={<AdminShop />} />
          <Route path="/admin/shop/create" element={<AdminShopCreate />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shop/shirts" element={<ShopShirts />} />
          <Route path="/shop/healthProducts" element={<ShopHealthProducts />} />
          <Route path="/shop/mugs" element={<ShopMugs />} />
          <Route path="/shop/:id" element={<Shop />} />

          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shop/search/:filterString" element={<Shopping />} />

          <Route path="/cart" element={<Cart />} />
          

          {!!auth.id}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shop/search/:filterString" element={<Shopping />} />
        </Routes>
      </div>

      <FooterNav />
    </div>
  );
};

export default App;
