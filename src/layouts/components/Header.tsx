import { useAuthenticatedUser } from "@/context";
import { UserSummary } from "@/features/users/components/UserSummary";
import { Modal } from "@/shared/components/ui";
import { displayName } from "@/shared/utils/user";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import menuImg from "@/assets/images/controls/menu.png";
import homeImg from "@/assets/images/controls/home.png";
import { Avatar } from "@/shared/components/guards/Avatar";

export function Header() {
  const user = useAuthenticatedUser();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if current path is an assessment page
  const isAssessmentPage = location.pathname.includes("evaluaciones");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar gender={user.gender} className="w-16! h-16!" />
          <span className="text-xl font-semibold bg-(--cyan) text-white text-shadow-blue px-4 py-1 rounded-full border-3 border-(--yellow)">
            {displayName(user)}
          </span>
        </div>
        {!isAssessmentPage && (
          <div className="flex items-center gap-6">
            <Link to="/home">
              <img src={homeImg} alt="Home" className="w-12 cursor-pointer" />
            </Link>
            <button onClick={handleOpen}>
              <img src={menuImg} alt="Menu" className="w-14 cursor-pointer" />
            </button>
          </div>
        )}
      </header>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="full"
        className="bg-white/80! border-3 border-(--blue)"
      >
        <UserSummary />
      </Modal>
    </>
  );
}
