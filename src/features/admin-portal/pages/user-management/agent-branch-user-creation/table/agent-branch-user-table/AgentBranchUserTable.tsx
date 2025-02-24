// import { DynamicTable } from "@/components/common/DynamicTable";
// import { getAgentBranchUserColumn } from "./agent-branch-user-table-col";
// // import AgentRegistrationForm from "../agent-branch-user-table/A";

// import { DialogWrapper } from "@/components/common/DialogWrapper";
// import AgentRegistrationForm from "../../agent-branch-form/AgentRegistrationForm";

// const AgentBranchUserTable = () => {
//   const columns = getAgentBranchUserColumn();

//   const handleCreateUser = () => {
//     // Handle user creation logic
//     console.log("Creating user...");
//   };

//   return (
//     <div className="">
//       <DynamicTable
//         columns={columns}
//         data={[]}
//         tableWrapperClass="bg-background p-5 rounded-md"
//         defaultSortColumn="requestId"
//         renderLeftSideActions={() => (
//           <DialogWrapper
//           triggerBtnText="Create Agent Branch User"
//            title="Create New User"
//            description="Fill in the details to create a new user"
//             className="h-[80vh] overflow-y-auto" 
//              renderContent={
//              <div><AgentRegistrationForm/></div>
//             }
//             onSave={handleCreateUser}
//             // footerBtnText="Create"
//             footerBtnText="Create"
            
//           />
//         )}
//         filter={{
//           filterOption: true,
//           dateFilterColumn: "requestRaiseDate",
//           statusFilerColumn: "status",
//           roleFilerColumn: "role",
//           rederFilerOptions: {
//             search: true,
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default AgentBranchUserTable;
import { DynamicTable } from "@/components/common/DynamicTable";
import { getAgentBranchUserColumn } from "./agent-branch-user-table-col";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AgentBranchUserTable = () => {
  const columns = getAgentBranchUserColumn();
  const navigate = useNavigate();
  const handleCreateUser = () => {
    navigate("/admin/user-management/agent-branch-user-registration");
    console.log("Creating user...");
  };

  return (
    <div className="">
      <DynamicTable
        columns={columns}
        data={[]}
        tableWrapperClass="bg-background p-5 rounded-md"
        defaultSortColumn="requestId"
        renderLeftSideActions={() => (
          <Button 
            onClick={handleCreateUser}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Create Agent Branch User
          </Button>
        )}
        filter={{
          filterOption: true,
          dateFilterColumn: "requestRaiseDate",
          statusFilerColumn: "status",
          roleFilerColumn: "role",
          rederFilerOptions: {
            search: true,
          },
        }}
      />
    </div>
  );
};

export default AgentBranchUserTable;