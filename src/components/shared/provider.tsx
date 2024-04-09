import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider>
        {children}
        <Analytics />
      </ClerkProvider>
    </>
  );
};

export default Providers;
