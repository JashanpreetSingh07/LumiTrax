import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTransactions } from '../hooks/useTransactions';

const COLORS = ['#14b8a6', '#0d9488', '#06b6d4', '#0891b2', '#22d3ee', '#f59e0b', '#f43f5e'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-black dark:text-white font-medium">
          {name}: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const { transactions } = useTransactions();

  const expenseData = useMemo(() => {
    const byCategory = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });
    return Object.entries(byCategory).map(([name, value], i) => ({
      name,
      value: Math.round(value),
      fill: COLORS[i % COLORS.length],
    }));
  }, [transactions]);

  const incomeData = useMemo(() => {
    const byCategory = {};
    transactions
      .filter((t) => t.type === 'income')
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });
    return Object.entries(byCategory).map(([name, value], i) => ({
      name,
      value: Math.round(value),
      fill: COLORS[i % COLORS.length],
    }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const byMonth = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }
      byMonth[monthKey][t.type] += t.amount;
    });
    return Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const formatCurrency = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6 pb-24 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Detailed insights into your finances</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Expenses by Category</h2>
          {expenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-16">No expense data available</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Income by Category</h2>
          {incomeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-16">No income data available</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Monthly Income vs Expenses</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-16">No transaction data available</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}