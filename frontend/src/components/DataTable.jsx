import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function DataTable({ title, data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-primary/5 to-secondary/5">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full mr-4"></div>
          {title}
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Cuenta
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                2025
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                2024
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Variación
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Tendencia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {data.map((item, index) => {
              const variationPercent = item.value2024 !== 0 
                ? ((item.variation / item.value2024) * 100).toFixed(2)
                : 0;
              
              const isPositive = parseFloat(variationPercent) > 0;
              const isNegative = parseFloat(variationPercent) < 0;
              const isTotal = item.subcategory === 'TOTAL' || item.category === 'TOTAL';
              
              return (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`hover:bg-gray-700/30 transition-all duration-200 ${
                    isTotal ? 'bg-gray-700/20 font-semibold' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      {!isTotal && (
                        <div className="w-2 h-2 rounded-full bg-primary/50 mr-3"></div>
                      )}
                      <span className={isTotal ? 'font-bold text-white' : ''}>
                        {item.accountName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-white font-medium">
                    {formatCurrency(item.value2025)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-400">
                    {formatCurrency(item.value2024)}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-semibold ${
                    isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {isPositive && '+'}{variationPercent}%
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {isPositive ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                      ) : isNegative ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10">
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-500/10">
                          <Minus className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
