import { Image } from '@/components/ui/image';
import dataSeedLogo from '@/assets/images/dataseed-white-logo.svg';
import poweredBy from '@/assets/images/powered-by.svg';

const PoweredBy = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16 mb-5">
      <Image src={poweredBy} width={60} height={20} alt="Powered by" />

      {/* DataSeed logo */}
      <Image src={dataSeedLogo} width={120} height={40} alt="DataSeed Logo" />
    </div>
  );
};

export default PoweredBy;
