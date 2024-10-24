import { motion } from 'framer-motion';
import './NoCardsMessage.scss';

export function NoCardsMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="dialog-cloud"
    >
      No playable cards. End your turn.
    </motion.div>
  );
}
