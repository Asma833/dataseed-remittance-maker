import {
  CheckCircle,
  XCircle,
  MoreHorizontal,
  FileCheck2,
  FileX,
  FileClock,
} from "lucide-react";
import img from "../../../../../../assets/images/img.png";
import image2 from "../../../../../../assets/images/img-2.png";
import image3 from "../../../../../../assets/images/img-3.png";
import image4 from "../../../../../../assets/images/img-4.png";
import image5 from "../../../../../../assets/images/img-5.png";
import image6 from "../../../../../../assets/images/img-6.png";
import image7 from "../../../../../../assets/images/img-7.png";
import image8 from "../../../../../../assets/images/img-8.png";
import image9 from "../../../../../../assets/images/img-9.png";
import image10 from "../../../../../../assets/images/img-10.png";
import { DashboardMetrics } from "@/features/checker/hooks/useGetDashCardMatrics";

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
    path: img,
  },
  {
    id: 2,
    title: "Transaction Approved",
    count: metrics.transactionApproved,
    status: "Approved",
    icon: CheckCircle,
    path: image2,
  },
  {
    id: 3,
    title: "Transaction Rejected",
    count: metrics.transactionRejected,
    status: "Rejected",
    icon: XCircle,
    path: image3,
  },
  {
    id: 4,
    title: "Transaction Pending",
    count: metrics.transactionPending,
    status: "Pending",
    icon: MoreHorizontal,
    path: image4,
  },
  {
    id: 5,
    title: "VKYC Completed",
    count: metrics.vkycCompleted,
    status: "Completed",
    icon: FileCheck2,
    path: image5,
  },
  {
    id: 6,
    title: "VKYC Pending",
    count: metrics.vkycPending,
    status: "Pending",
    icon: FileClock,
    path: image6,
  },
  {
    id: 7,
    title: "VKYC Rejected",
    count: metrics.vkycRejected,
    status: "Rejected",
    icon: FileX,
    path: image7,
  },
  {
    id: 8,
    title: "Esign Completed",
    count: metrics.esignCompleted,
    status: "Completed",
    icon: FileCheck2,
    path: image8,
  },
  {
    id: 9,
    title: "Esign Pending",
    count: metrics.esignPending,
    status: "Pending",
    icon: FileClock,
    path: image9,
  },
  {
    id: 10,
    title: "Esign Rejected",
    count: metrics.esignRejected,
    status: "Rejected",
    icon: FileX,
    path: image10,
  },
];

// Default data (for backward compatibility)
export const dashboardData = createDashboardData(apiDummyData);
