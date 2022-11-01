import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { createTicket, reset } from '../features/tickets/ticketSlice';

function NewTicket() {
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const name = user.name;
  const email = user.email;
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');

  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition },
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      toast.success('Ticket created.');
      navigate('/tickets');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <motion.div
        initial="exit"
        animate="enter"
        exit="exit"
        variants={postVariants}
      >
        <BackButton url={'/'} />
        <section className="heading">
          <h1>Create New Ticket</h1>
          <p>Please fill out form below</p>
        </section>
        <section className="form">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select
                name="product"
                id="product"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              >
                <option value="Alienware">Alienware</option>
                <option value="iMac">iMac</option>
                <option value="ASUS">ASUS</option>
                <option value="MacBook">MacBook</option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="Geforce">Geforce</option>
                <option value="Logitech">Logitech</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description of the issue</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
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

export default NewTicket;
