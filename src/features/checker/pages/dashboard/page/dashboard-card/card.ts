import {
  CheckCircle,
  XCircle,
  MoreHorizontal,
  FileCheck2,
  FileX,
  FileClock,
} from "lucide-react";
import transactionReceived from "../../../../../../assets/images/transaction-received.png";
import transactionApproved from "../../../../../../assets/images/transaction-approved.png";
import transactionRejected from "../../../../../../assets/images/transaction-rejected.png";
import transactionPending from "../../../../../../assets/images/transaction-pending.png";
import vkycCompleted from "../../../../../../assets/images/vkyc-completed.png";
import vkycRejected from "../../../../../../assets/images/vkyc-rejected.png";
import vkycPending from "../../../../../../assets/images/vkyc-pending.png";
import esignCompleted from "../../../../../../assets/images/esign-completed.png";
import esignRejected from "../../../../../../assets/images/esign-rejected.png";
import esignPending from "../../../../../../assets/images/esign-pending.png";
import { DashboardMetrics } from "@/features/checker/hooks/useGetDashboardCardMatrics";

export interface DashboardItem {
  id: number;
  title: string;
  count: number;
  icon: React.ComponentType; 
  path: string;
  status: string;
}

// Default fallback data when API data is not available
export const apiDummyData: DashboardMetrics = {
  transactionReceived: 0,
  transactionApproved: 0,
  transactionRejected: 0,
  transactionPending: 0,
  vkycCompleted: 0,
  vkycPending: 0,
  vkycRejected: 0,
  esignCompleted: 0,
  esignPending: 0,
  esignRejected: 0,
};

// Create dashboard data based on metrics from API
export const createDashboardData = (metrics: DashboardMetrics = apiDummyData): DashboardItem[] => [
  {
    id: 1,
    title: "Transaction Received",
    count: metrics.transactionReceived,
    status: "Received",
    icon: FileCheck2,
    path: transactionReceived,
  },
  {
    id: 2,
    title: "Transaction Approved",
    count: metrics.transactionApproved,
    status: "Approved",
    icon: CheckCircle,
    path: transactionApproved,
  },
  {
    id: 3,
    title: "Transaction Rejected",
    count: metrics.transactionRejected,
    status: "Rejected",
    icon: XCircle,
    path: transactionRejected,
  },
  {
    id: 4,
    title: "Transaction Pending",
    count: metrics.transactionPending,
    status: "Pending",
    icon: MoreHorizontal,
    path: transactionPending,
  },
  {
    id: 5,
    title: "VKYC Completed",
    count: metrics.vkycCompleted,
    status: "Completed",
    icon: FileCheck2,
    path: vkycCompleted,
  },
  {
    id: 6,
    title: "VKYC Pending",
    count: metrics.vkycPending,
    status: "Pending",
    icon: FileClock,
    path: vkycRejected,
  },
  {
    id: 7,
    title: "VKYC Rejected",
    count: metrics.vkycRejected,
    status: "Rejected",
    icon: FileX,
    path: vkycPending,
  },
  {
    id: 8,
    title: "Esign Completed",
    count: metrics.esignCompleted,
    status: "Completed",
    icon: FileCheck2,
    path: esignCompleted,
  },
  {
    id: 9,
    title: "Esign Pending",
    count: metrics.esignPending,
    status: "Pending",
    icon: FileClock,
    path: esignRejected,
  },
  {
    id: 10,
    title: "Esign Rejected",
    count: metrics.esignRejected,
    status: "Rejected",
    icon: FileX,
    path: esignPending,
  },
];

// Default data (for backward compatibility)
export const dashboardData = createDashboardData(apiDummyData);
