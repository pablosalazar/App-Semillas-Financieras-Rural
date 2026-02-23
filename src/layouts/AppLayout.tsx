import { Outlet } from "react-router";
import { Header } from "./components/Header";

function AppLayout() {
  return (
    <main className="h-screen flex flex-col bg-home overflow-hidden">
      <Header />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;
