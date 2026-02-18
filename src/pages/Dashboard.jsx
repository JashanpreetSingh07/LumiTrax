import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SummaryCards from '../components/SummaryCards';
import Filters from '../components/Filters';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import FloatingAddButton from '../components/FloatingAddButton';
import SpendingChart from '../components/SpendingChart';
import { useTransactions } from '../hooks/useTransactions';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [typeFilter, setTypeFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    balance,
    income,
    expenses,
  } = useTransactions();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        !search || tx.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        category === 'All' || tx.category === category;
      const matchType =
        typeFilter === 'all' ||
        tx.type === typeFilter;
      return matchSearch && matchCategory && matchType;
    });
  }, [transactions, search, category, typeFilter]);

  const handleAdd = async (data) => {
    await addTransaction(data);
    setModalOpen(false);
  };

  const handleEdit = async (data) => {
    if (!editingTx?.id) return;
    await updateTransaction(editingTx.id, data);
    setEditingTx(null);
  };

  const handleDelete = async (tx) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(tx.id);
    }
  };

  const openEditModal = (tx) => setEditingTx(tx);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6 pb-24 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Overview of your finances</p>
      </div>

      <SummaryCards balance={balance} income={income} expenses={expenses} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Filters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Transactions
            </h2>
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <TransactionList
                transactions={filteredTransactions}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
        <div>
          <SpendingChart transactions={transactions} />
        </div>
      </div>

      <FloatingAddButton onClick={() => { setEditingTx(null); setModalOpen(true); }} />

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTx(null); }}
        onSubmit={handleAdd}
      />
      <TransactionModal
        isOpen={!!editingTx}
        onClose={() => setEditingTx(null)}
        onSubmit={handleEdit}
        initialData={editingTx}
      />
    </motion.div>
  );
}
