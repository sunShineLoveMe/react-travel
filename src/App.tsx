import React from 'react';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Navigate } from 'react-router-dom'
import { useSelector } from './redux/hooks';

const PrivateRoute = ({ children }) => {
  const jwt = useSelector(state => state.user.token);
  return jwt ? children : <Navigate to="/signin" />
}

function App() {
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
          <Route path="*" element={<h1>404 not found 页面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
