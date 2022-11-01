import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, logout } from '../features/auth/authSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);
  const onLogout = () => {
    navigate('/');
    dispatch(logout());
    dispatch(reset());
    toast.success('Logged Out');
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const name = () => {
    const [first, last] = user.name.split(' ');
    return `${first}. ${last.charAt(0)}`;
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <>
            <p>{name()}</p>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
