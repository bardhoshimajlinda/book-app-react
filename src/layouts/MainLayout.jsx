import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <section>{children}</section>
      <Footer />
    </div>
  );
};

export default MainLayout;
