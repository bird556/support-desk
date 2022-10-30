import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimatedRoutes from './components/AnimatedRoutes';
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <AnimatedRoutes />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
