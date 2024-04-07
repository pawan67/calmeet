import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="py-8 flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <img className="w-10" src="/images/logo.png" alt="logo" />
        <h1 className=" font-semibold text-xl">Calmeet</h1>
      </div>
      <div>
        <SignInButton mode="modal">
          <Button className="  rounded-full font-semibold px-5">Login</Button>

          {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex min-w-[120px] h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Login
            </span>
          </button> */}
        </SignInButton>
      </div>
    </header>
  );
};

export default Header;
