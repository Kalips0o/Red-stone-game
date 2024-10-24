import { motion } from 'framer-motion';
import './NoCardsMessage.scss';

interface NoCardsMessageProps {
  text: string;
}

export function NoCardsMessage({ text }: NoCardsMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="dialog-cloud"
    >
      {text}
    </motion.div>
  );
}
