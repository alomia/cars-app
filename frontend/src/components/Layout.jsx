import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 min-h-full flex flex-col align-middle justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
