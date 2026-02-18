import { motion } from 'framer-motion';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';

export default function AddTransaction() {
  const { addTransaction, balance, income, expenses } = useTransactions();

  const handleSubmit = async (data) => {
    await addTransaction(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Transaction</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Record your income or expenses</p>
      </div>
      <SummaryCards balance={balance} income={income} expenses={expenses} />
      <TransactionForm onSubmit={handleSubmit} />
    </motion.div>
  );
}
