import React, { useEffect } from 'react';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useSelector } from './redux/hooks';
import { getShoppingCart } from './redux/shopppingCart/slice';

const PrivateRoute = ({ children }) => {
  const jwt = useSelector(state => state.user.token);
  return jwt ? children : <Navigate to="/signin" />
}

function App() {

  const jwt = useSelector(state => state.user.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          {/* <Route path="/search/:keywords" element={<SearchPage />} /> */}
          <Route path='/search/' element={<SearchPage />}>
            <Route path=':keywords' element={<SearchPage />} />
          </Route>
          <Route path='/shoppingCart' element={
            <PrivateRoute>
              <ShoppingCartPage />
            </PrivateRoute>
          } />
          <Route path='/placeOrder' element={
            <PrivateRoute>
              <PlaceOrderPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<h1>404 not found 页面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
