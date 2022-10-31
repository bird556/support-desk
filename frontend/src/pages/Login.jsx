import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1, transition },
    exit: { x: 100, opacity: 0, transition },
  };

  return (
    <>
      <motion.div
        initial="exit"
        animate="enter"
        exit="exit"
        variants={postVariants}
      >
        <section className="heading">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Please login to get support</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Enter a password"
                required
              />
            </div>

            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </motion.div>
    </>
  );
}

export default Login;
