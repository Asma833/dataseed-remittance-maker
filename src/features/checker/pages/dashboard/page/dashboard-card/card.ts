import { CheckCircle, XCircle, MoreHorizontal, FileCheck2, FileX, FileClock } from "lucide-react";
import  img  from "../../../../../../assets/images/img.png";
import  image2  from "../../../../../../assets/images/img-2.png";
import  image3  from "../../../../../../assets/images/img-3.png";
import  image4  from "../../../../../../assets/images/img-4.png";
import  image5 from "../../../../../../assets/images/img-5.png";
import  image6 from "../../../../../../assets/images/img-6.png";
import  image7 from "../../../../../../assets/images/img-7.png";
import  image8 from "../../../../../../assets/images/img-8.png";
import  image9 from "../../../../../../assets/images/img-9.png";
import  image10 from "../../../../../../assets/images/img-10.png"; 
export interface DashboardItem {
  id: number;
  title: string;
  count: number;
  icon: React.ComponentType; // Store icon as a component reference
  path:string;
  status:string;
}

export const dashboardData: DashboardItem[] = [
  { id: 1, title: "Transaction Received", count: 3100,status:"Received", icon: FileCheck2 ,path:img},
  { id: 2, title: "Transaction Approved", count: 900,status:"Approved", icon: CheckCircle,path:image2 },
  { id: 3, title: "Transaction Rejected", count: 3100,status:"Rejected", icon: XCircle,path:image3},
  { id: 4, title: "Transaction Pending", count: 1100,status:"Pending", icon: MoreHorizontal,path:image4 },
  { id: 5, title: "VKYC Completed", count: 1800,status:"Completed", icon: FileCheck2,path:image5 },
  { id: 6, title: "VKYC Pending", count: 800,status:"Pending", icon: FileClock,path:image6 },
  { id: 7, title: "VKYC Rejected", count: 800,status:"Rejected", icon: FileX,path:image7 },
  { id: 8, title: "Esign Completed", count: 500,status:"Completed", icon: FileCheck2,path:image8 },
  { id: 9, title: "Esign Pending", count: 50,status:"Pending", icon: FileClock,path:image9 },
  { id: 10, title: "Esign Rejected", count: 200,status:"Rejected", icon: FileX,path:image10 },
];
