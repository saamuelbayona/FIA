import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Activity } from 'lucide-react';

export default function StatsCards({ data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatShort = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return formatCurrency(value);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.value2025 || 0), 0);
  };

  const calculateChange = (items) => {
    const total2025 = items.reduce((sum, item) => sum + (item.value2025 || 0), 0);
    const total2024 = items.reduce((sum, item) => sum + (item.value2024 || 0), 0);
    if (total2024 === 0) return 0;
    return (((total2025 - total2024) / total2024) * 100).toFixed(2);
  };

  const totalActivos = calculateTotal(data.activos);
  const totalPasivos = calculateTotal(data.pasivos);
  const totalPatrimonio = calculateTotal(data.patrimonio);
  
  const liquidez = totalActivos > 0 ? (totalActivos / totalPasivos).toFixed(2) : 0;
  const endeudamiento = totalActivos > 0 ? ((totalPasivos / totalActivos) * 100).toFixed(2) : 0;
  const rentabilidad = totalPatrimonio > 0 ? ((totalPatrimonio / totalActivos) * 100).toFixed(2) : 0;

  const stats = [
    {
      title: 'Total Activos',
      value: formatShort(totalActivos),
      fullValue: formatCurrency(totalActivos),
      change: calculateChange(data.activos),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      title: 'Total Pasivos',
      value: formatShort(totalPasivos),
      fullValue: formatCurrency(totalPasivos),
      change: calculateChange(data.pasivos),
      icon: BarChart3,
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400'
    },
    {
      title: 'Patrimonio',
      value: formatShort(totalPatrimonio),
      fullValue: formatCurrency(totalPatrimonio),
      change: calculateChange(data.patrimonio),
      icon: PieChart,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      title: 'Índice de Liquidez',
      value: liquidez,
      fullValue: `${liquidez} veces`,
      change: null,
      icon: Activity,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      description: 'Capacidad de pago'
    },
    {
      title: 'Endeudamiento',
      value: `${endeudamiento}%`,
      fullValue: `${endeudamiento}% del total de activos`,
      change: null,
      icon: TrendingDown,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
      description: 'Nivel de deuda'
    },
    {
      title: 'Rentabilidad',
      value: `${rentabilidad}%`,
      fullValue: `${rentabilidad}% sobre activos`,
      change: null,
      icon: TrendingUp,
      color: 'from-teal-500 to-green-600',
      bgColor: 'bg-teal-500/10',
      textColor: 'text-teal-400',
      description: 'ROA'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300 overflow-hidden group"
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  {stat.description && (
                    <p className="text-gray-500 text-xs">{stat.description}</p>
                  )}
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white" title={stat.fullValue}>
                  {stat.value}
                </p>
                
                {stat.change !== null && (
                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center text-sm font-medium ${
                      parseFloat(stat.change) >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {parseFloat(stat.change) >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-gray-500 text-xs">vs 2024</span>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative corner */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`}></div>
          </motion.div>
        );
      })}
    </div>
  );
}
