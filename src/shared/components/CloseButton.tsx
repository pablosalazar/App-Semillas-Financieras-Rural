import closeImg from "@/assets/images/controls/close.png";
import clsx from "clsx";
import { useNavigate } from "react-router";

interface BaseCloseButtonProps {
  className?: string;
}

// Option 1: Has onClick (redirectTo is optional)
interface CloseButtonWithOnClick extends BaseCloseButtonProps {
  onClick: () => void;
  redirectTo?: string;
}

// Option 2: Has redirectTo (onClick is optional)
interface CloseButtonWithRedirect extends BaseCloseButtonProps {
  redirectTo: string;
  onClick?: () => void;
}

// Union type: must have at least one of onClick or redirectTo
type CloseButtonProps = CloseButtonWithOnClick | CloseButtonWithRedirect;

export const CloseButton = ({
  onClick,
  redirectTo,
  className,
}: CloseButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
    onClick?.();
  };
  return (
    <button
      onClick={handleClick}
      className={clsx(className, "w-12 h-12 cursor-pointer")}
    >
      <img src={closeImg} alt="Close" />
    </button>
  );
};
