import { Outlet } from "react-router";
import logoFooter from "@/assets/images/logo-footer.png";

function AuthLayout() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-image bg-login px-4 ">
      <div className="flex-1 flex items-center justify-center w-full">
        <Outlet />
      </div>
      <footer>
        <img
          src={logoFooter}
          alt="Logo Footer"
          className="h-12 sm:h-16 w-auto"
        />
      </footer>
    </main>
  );
}

export default AuthLayout;
