import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const cards = [
  {
    label: 'Total Balance',
    key: 'balance',
    icon: Wallet,
    gradient: 'from-teal-500 to-emerald-600',
    shadow: 'shadow-teal-500/25',
    isBalance: true,
  },
  {
    label: 'Income',
    key: 'income',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-green-600',
    shadow: 'shadow-emerald-500/25',
  },
  {
    label: 'Expenses',
    key: 'expenses',
    icon: TrendingDown,
    gradient: 'from-rose-500 to-red-600',
    shadow: 'shadow-rose-500/25',
  },
];

export default function SummaryCards({ balance, income, expenses }) {
  const values = { balance, income, expenses };

  const formatCurrency = (n) => {
    const abs = Math.abs(n);
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(abs);
    return n < 0 ? `-${formatted}` : formatted;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {cards.map(({ label, key, icon: Icon, gradient, shadow, isBalance }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg ${shadow} transition-all duration-300 group`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity`} />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
              <p
                className={`mt-2 text-2xl font-bold ${
                  isBalance
                    ? balance >= 0
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-rose-600 dark:text-rose-400'
                    : key === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {formatCurrency(values[key])}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${shadow} group-hover:scale-110 transition-transform`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
