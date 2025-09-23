import { FieldType } from "@/types/enums";

export const branchAgentCreationConfig = () => {
  return {
    sectionTitle: "Branch Agent Creation",
    fields: {
      agentDetails: {
        // Vendor
        vendorName: {
          name: "agentDetails.vendorDetails.vendorName",
          label: "Vendor Name",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter Vendor Name",
        },
        vendorCode: {
          name: "agentDetails.vendorDetails.vendorCode",
          label:"Vendor Code",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter Vendor Code",
        },
        systemCode: {
          name: "agentDetails.vendorDetails.systemCode",
          label: "System Code",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter System Code",
        },

        // Basic
        fullName: {
          name: "agentDetails.basicDetails.fullName",
          label:"Full Name",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter Full Name",
        },
        emailId: {
          name: "agentDetails.basicDetails.emailId",
          label: "Email Id",
          type: FieldType.Email,
          required: true,
          placeholder: "Enter Email Id",
        },
        mobileNo: {
          name: "agentDetails.basicDetails.mobileNo",
          label:"Mobile No",
          type: FieldType.Phone,
          required: true,
          placeholder: "Enter Phone No.",
        },

        // Address
        state: {
          name: "agentDetails.address.state",
          label:"State",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter State",
        },
        city: {
          name: "agentDetails.address.city",
          label:"City",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter City",
        },
        branch: {
          name: "agentDetails.address.branch",
          label:"Branch",
          type: FieldType.Text,
          required: true,
          placeholder: "Enter Branch",
        },

        // Role / Checker / Status
        role: {
          name: "agentDetails.roleStatus.role",
          label:"Choose Role",
          type: FieldType.Checkbox,
          required: true,
          isMulti:true,
          variant:"circle_check_filled",
          options: {
            maker: { label: "Maker" },
            checker: { label: "Checker", checked: true },
            both: { label: "Both" },
            admin: { label: "Admin" },
          },
        },
        checkerList: {
          name: "agentDetails.roleStatus.checkerList",
          label: "Checker List",
          type: FieldType.Select,
          required: true,
          placeholder: "Select Checker",
          options: [
            { value: "checker1", label: "Sham Shetty" },
            { value: "checker2", label: "Checker 2" },
            { value: "checker3", label: "Checker 3" },
          ],
        },
        status: {
          name: "agentDetails.roleStatus.status",
          label: "Status",
          type: FieldType.Radio,
          required: true,
          options: {
            active: { label: "Active", checked: true },
            inactive: { label: "Inactive" },
          },
        },

        // Security
        password: {
          name: "agentDetails.security.password",
          label:"Password",
          type: FieldType.Password,
          required: true,
          placeholder: "Enter Password",
        },
        confirmPassword: {
          name: "agentDetails.security.confirmPassword",
          label: "Confirm Password",
          type: FieldType.Password,
          required: true,
          placeholder: "Enter Password",
        },
      },
    },
  };
};
