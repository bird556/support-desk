import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { tickets, isSuccess, isLoading } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition },
  };

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={postVariants}
    >
      <BackButton url={'/'} />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.map((ticket) => {
          return <TicketItem key={ticket.id} ticket={ticket} />;
        })}
      </div>
    </motion.div>
  );
}

export default Tickets;
