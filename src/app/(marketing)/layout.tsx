import Footer from "./_components/footer";
import Header from "./_components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen container mx-auto  relative">
      <Header />
      <main>{children}</main>
      <Footer />{" "}
    </div>
  );
};

export default Layout;
