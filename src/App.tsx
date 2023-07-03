import React from 'react';
import { HomePage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<h1>登陆页面</h1>} />
          <Route element={<h1>404 not found 页面去火星了！</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
