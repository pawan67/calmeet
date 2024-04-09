import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className=" bg-muted rounded-3xl p-10   mx-auto  space-y-2 my-10">
        <div className=" flex items-center gap-3 font-bold text-xl">
          <img src="/images/logo.png" alt="Calmeet" className="w-12 " />
          <h2>Calmeet.</h2>
        </div>

        <div>
          <p className=" mt-5 text-sm">&copy; 2024 Calmeet. All rights reserved.</p>
          <Link href="terms-and-conditions" className=" text-sm">
            Terms and conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
