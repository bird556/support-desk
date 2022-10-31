import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const name = user.name;
  const email = user.email;
  const [product, setProduct] = useState('');
  const [desc, setDesc] = useState('');

  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition },
  };
  const onSubmit = (e) => {
    e.preventDefault();
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
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description of the issue</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
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
