import { LoaderCircle } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center w-full">
      <LoaderCircle className="text-primary-500 animate-spin " size={40} />
    </div>
  );
};

export default FullPageLoader;
