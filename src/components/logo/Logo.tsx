import Image from '../common/image';
import logoUrl from '@/assets/images/ebix-logo.svg';

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const Logo = ({ width = 120, height = 80, className }: Props) => {
  return <Image src={logoUrl} alt="Logo" width={width} height={height} loading="eager" className={className || ''} />;
};

export default Logo;
