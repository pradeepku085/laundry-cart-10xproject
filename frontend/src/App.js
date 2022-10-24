import './App.css';

import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Order from './components/order/orders';
import Landing from './components/signInAndReg/landing';

function App() {
  const [user, setUser] = useState({});
  return (
    <>
      ss
      <Router>
        <Routes>
          <Route path="/" element={<Landing user={user} setUser={setUser} />} />
          <Route
            path="/order"
            element={<Order user={user} setUser={setUser} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
