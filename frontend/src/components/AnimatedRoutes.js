import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AnimatePresence } from 'framer-motion';
import NewTicket from '../pages/NewTicket';
import PrivateRoute from '../components/PrivateRoute';
import Tickets from '../pages/Tickets';
import ViewTicket from '../pages/ViewTicket';
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-ticket" element={<PrivateRoute />}>
          <Route path="/new-ticket" element={<NewTicket />} />
        </Route>
        <Route path="/tickets" element={<PrivateRoute />}>
          <Route path="/tickets" element={<Tickets />} />
        </Route>
        <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
          <Route path="/ticket/:ticketId" element={<ViewTicket />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
