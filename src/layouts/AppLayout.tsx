import { Outlet } from "react-router";
import logoFooter from "@/assets/images/logo-footer.png";
import { Header } from "./components/Header";

function AppLayout() {
  return (
    <main className="h-screen flex flex-col bg-default overflow-hidden">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="flex justify-center">
        <img
          src={logoFooter}
          alt="Logo Footer"
          className="h-10 sm:h-14 w-auto"
        />
      </footer>
    </main>
  );
}

export default AppLayout;
