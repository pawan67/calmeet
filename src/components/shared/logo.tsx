import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({
  size = "md",
  className,
  rounded = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  rounded?: boolean;
}) => {
  const imgSize = size === "sm" ? 8 : size === "md" ? 12 : 16;
  return (
    <Link href="/">
      <img
        src="/images/logo.png"
        alt="logo"
        className={cn(
          className,
          `w-${imgSize} h-${imgSize} ${rounded && " rounded-full"}  `
        )}
      />
    </Link>
  );
};

export default Logo;
