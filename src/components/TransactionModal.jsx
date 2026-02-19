import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const categories = ['Food', 'Transport', 'Shopping', 'Utilities', 'Entertainment', 'Health', 'Other'];

export default function TransactionModal({ isOpen, onClose, onSubmit, initialData }) {
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        amount: String(initialData.amount || ''),
        type: initialData.type || 'expense',
        category: initialData.category || 'Food',
        date: initialData.date
          ? new Date(initialData.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    } else {
      setForm({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Food',
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.amount || parseFloat(form.amount) <= 0) return;
    onSubmit({
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md max-h-[90vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isEdit ? 'Edit Transaction' : 'Add Transaction'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Groceries"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: 'income' }))}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                        form.type === 'income'
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Income
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: 'expense' }))}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                        form.type === 'expense'
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Expense
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all"
                >
                  {isEdit ? 'Update' : 'Add'} Transaction
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
