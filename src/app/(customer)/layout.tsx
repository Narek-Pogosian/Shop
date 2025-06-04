import SkipToMain from "./_components/skip-to-main";
import Footer from "./_components/footer";
import Header from "./_components/header";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <SkipToMain />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="container grow pt-3 pb-6 outline-none"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
