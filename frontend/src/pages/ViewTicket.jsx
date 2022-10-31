import { motion } from 'framer-motion';
function ViewTicket() {
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
      <h1>View Ticket</h1>
    </motion.div>
  );
}

export default ViewTicket;
