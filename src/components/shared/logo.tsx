import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const imgSize = size === "sm" ? 8 : size === "md" ? 12 : 16;
  return (
    <Link href="/">
      <img
        src="/images/logo.png"
        alt="logo"
        className={cn(className, `w-${imgSize} h-${imgSize}  `)}
      />
    </Link>
  );
};

export default Logo;
