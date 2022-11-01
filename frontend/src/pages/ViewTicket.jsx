import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { singleTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

function ViewTicket() {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );

  const params = useParams();
  const dispatch = useDispatch();

  const { _id } = params;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(singleTicket(_id));
    // eslint-disable-next-line
  }, [isError, message, _id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Oops...something went wrong</h3>;
  }
  console.log(ticket);
  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition },
  };
  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={postVariants}
    >
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url={'/tickets'} />
          <h2>
            Ticket ID:{ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
      </div>
      <h2>{ticket.product}</h2>
      <h2>{ticket.description}</h2>
    </motion.div>
  );
}

export default ViewTicket;
