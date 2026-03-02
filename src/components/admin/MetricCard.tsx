import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';

interface MetricCardProps {
  title: string;
  total: number;
  active: number;
  pending: number;
  icon?: 'users' | 'trending' | 'check' | 'clock';
  color?: 'blue' | 'purple' | 'green' | 'orange';
}

const MetricCard = ({ title, total, active, pending, icon = 'users', color = 'blue' }: MetricCardProps) => {
  const getIcon = () => {
    const iconClass = 'w-6 h-6';
    switch (icon) {
      case 'trending':
        return <TrendingUp className={iconClass} />;
      case 'check':
        return <CheckCircle className={iconClass} />;
      case 'clock':
        return <Clock className={iconClass} />;
      default:
        return <Users className={iconClass} />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return {
          bg: 'from-violet-600 to-purple-600',
          icon: 'bg-violet-500/20',
          text: 'text-violet-600',
        };
      case 'green':
        return {
          bg: 'from-emerald-600 to-teal-600',
          icon: 'bg-emerald-500/20',
          text: 'text-emerald-600',
        };
      case 'orange':
        return {
          bg: 'from-amber-600 to-orange-600',
          icon: 'bg-amber-500/20',
          text: 'text-amber-600',
        };
      default:
        return {
          bg: 'from-indigo-600 to-violet-600',
          icon: 'bg-indigo-500/20',
          text: 'text-indigo-600',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br ${colors.bg} flex items-center justify-center text-white shadow-lg transition-all duration-300`}>
          {getIcon()}
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-600 mb-1">{title}</p>
          <p className="text-3xl md:text-4xl font-bold text-slate-900">{total}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t-2 border-slate-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-600">Active</p>
          </div>
          <p className="text-lg md:text-xl font-bold text-emerald-700">{active}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-600">Pending</p>
          </div>
          <p className="text-lg md:text-xl font-bold text-amber-700">{pending}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
