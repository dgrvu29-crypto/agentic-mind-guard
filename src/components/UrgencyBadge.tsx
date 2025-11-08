import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type UrgencyLevel = 'green' | 'yellow' | 'red';

interface UrgencyBadgeProps {
  level: UrgencyLevel;
  className?: string;
}

export const UrgencyBadge = ({ level, className }: UrgencyBadgeProps) => {
  const config = {
    green: {
      icon: CheckCircle,
      label: 'Low Risk',
      className: 'bg-success/10 text-success border-success/20',
    },
    yellow: {
      icon: AlertTriangle,
      label: 'Moderate',
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    red: {
      icon: AlertCircle,
      label: 'High Risk',
      className: 'bg-destructive/10 text-destructive border-destructive/20',
    },
  };

  const { icon: Icon, label, className: badgeClass } = config[level];

  return (
    <Badge variant="outline" className={`${badgeClass} ${className} font-medium`}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  );
};
