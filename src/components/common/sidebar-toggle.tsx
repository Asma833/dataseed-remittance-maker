import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarToggle = ({ collapsed, setCollapsed }: Props) => {
  return (
    <button className="p-1 absolute -top-3 -right-6 bg-white border border-[#3d81db] rounded-full" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand' : 'Collapse'}>
      {collapsed ? <FaAngleRight  className="w-4 h-4 text-[#3d81db]" /> : <FaAngleLeft   className="w-4 h-4 text-[#3d81db]" />}
    </button>
  );
};

export default SidebarToggle;
