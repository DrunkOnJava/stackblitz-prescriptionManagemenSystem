export interface DashboardStats {
  totalPatients: number;
  activePrescriptions: number;
  pendingRefills: number;
  monthlyRevenue: number;
}

export interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
}