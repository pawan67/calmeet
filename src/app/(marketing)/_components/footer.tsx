import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className=" mx-auto text-right space-y-2 my-10">
        <p className=" text-sm">&copy; 2024 Calmeet. All rights reserved.</p>
        <Link href="terms-and-conditions" className=" text-sm">
          Terms and conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
