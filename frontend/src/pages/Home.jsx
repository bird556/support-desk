import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
function Home() {
  const transition = { duration: 0.3, ease: 'easeInOut' };

  const postVariants = {
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition },
  };

  return (
    <>
      {/* <motion.div
        initial={{
          // width: 0,
          height: 0,
          transform: 'translateY(500px)',
          overflow: 'hidden',
        }}
        animate={{
          // width: '100%',
          height: '100%',
          transform: 'translateY(0px)',
          overflow: 'hidden',
          // transition,
        }}
        exit={{
          // y: window.innerWidth,
          y: window.innerHeight,
          display: 'none',
          // transition,
        }}
      > */}

      <motion.div
        initial="exit"
        animate="enter"
        exit="exit"
        variants={postVariants}
      >
        <section className="heading">
          <h1>What do you need help with?</h1>
          <p>Please choose from an option below</p>
        </section>
        <Link to="/new-ticket" className="btn btn-reverse btn-block">
          <FaQuestionCircle /> Create New Ticket
        </Link>
        <Link to="/tickets" className="btn  btn-block">
          <FaTicketAlt /> View My Ticket
        </Link>
      </motion.div>
    </>
  );
}

export default Home;
