// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import panelright from '@/assets/icons/panel-right-open.svg';
type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarToggle = ({ collapsed, setCollapsed }: Props) => {
  return (
    <button
      className="p-[px] absolute -top-[27px] right-[10px] rounded-full cursor-pointer"
      onClick={() => setCollapsed(!collapsed)}
      title={collapsed ? 'Expand' : 'Collapse'}
    >
      {/* {collapsed ? <FaAngleRight  className="w-4 h-4 text-[var(--color-title)]" /> : <FaAngleLeft   className="w-4 h-4 text-[var(--color-title)]" />} */}
      <img src={panelright} />
    </button>
  );
};

export default SidebarToggle;
