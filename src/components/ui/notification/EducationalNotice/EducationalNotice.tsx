import { motion } from 'framer-motion';
import './EducationalNotice.scss';

interface EducationalNoticeProps {
  text: string;
}

export function EducationalNotice({ text }:EducationalNoticeProps) {
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
