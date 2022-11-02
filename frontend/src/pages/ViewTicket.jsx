import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { singleTicket, closeTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import { FaPlus } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotes, createNote } from '../features/notes/notesSlice';
import NoteItem from '../components/NoteItem';
import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function ViewTicket() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const {
    notes,
    isLoading: noteIsLoading,
    isError: noteIsError,
  } = useSelector((state) => state.note);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed');
        navigate('/tickets');
      })
      .catch(toast.error);
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText('');
        closeModal();
      })
      .catch(toast.error);
  };
  useEffect(() => {
    if (isError || noteIsError) {
      toast.error(message);
    }
    dispatch(singleTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  if (isError || noteIsError) {
    return <h3>Oops...something went wrong</h3>;
  }
  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1, transition },
    exit: { x: 100, opacity: 0, transition },
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
          <h3>Product: {ticket.product}</h3>

          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>

        {ticket.status !== 'closed' && (
          <button onClick={openModal} className="btn">
            <FaPlus /> Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={postVariants}
          >
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>
              X
            </button>
            <form onSubmit={onNoteSubmit}>
              <div className="form-group">
                <textarea
                  name="noteText"
                  id="noteText"
                  className="form-control"
                  placeholder="Note text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </Modal>

        {notes && notes.map((note) => <NoteItem key={note._id} note={note} />)}
        {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default ViewTicket;
