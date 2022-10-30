import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import { AnimatePresence } from 'framer-motion';
import NewTicket from '../pages/NewTicket';
import ViewTicket from '../pages/ViewTicket';
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-ticket" element={<NewTicket />} />
        <Route path="/tickets" element={<ViewTicket />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
