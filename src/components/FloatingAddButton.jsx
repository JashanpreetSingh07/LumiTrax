import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FloatingAddButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 flex items-center justify-center transition-shadow"
      aria-label="Add transaction"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  );
}
