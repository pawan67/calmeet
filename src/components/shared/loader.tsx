import { LoaderCircle } from "lucide-react";
import Logo from "./logo";
import { motion } from "framer-motion";
import React from "react";
import { Progress } from "../ui/progress";
const FullPageLoader = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    // slowly progress to 90% by stuttering

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" min-h-screen flex items-center justify-center w-full">
      <div className=" ">
        <Progress value={progress} className="w-[300px] h-2" />
      </div>
    </div>
  );
};

export default FullPageLoader;
