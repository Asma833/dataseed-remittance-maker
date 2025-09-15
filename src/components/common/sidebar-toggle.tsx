import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarToggle = ({ collapsed, setCollapsed }: Props) => {
  return (
    <button className="p-[px] absolute -top-[43px] -right-[20px] bg-white border border-[var(--color-title)] rounded-full cursor-pointer" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand' : 'Collapse'}>
      {collapsed ? <FaAngleRight  className="w-4 h-4 text-[var(--color-title)]" /> : <FaAngleLeft   className="w-4 h-4 text-[var(--color-title)]" />}
    </button>
  );
};

export default SidebarToggle;
